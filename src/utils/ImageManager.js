import api from './API';
import thumbnailCacher from './ThumbnailCacher';

class ImageManager {
    currentIdx = 0;
    imageList = [];
    
    set = new Set();
    originalImages = {};
    thumbnails = {};
    thumbnailsCount = 0;

    fetchID = 1;
    latestFetchID = {};

    async getImageBottom(setImageList) {
        let res = await thumbnailCacher.getImage(this.currentIdx);

        if(!res)
            return false;

        let addData = [];
        for(const k of res) {
            if(this.set.has(k.id))
                continue;

            addData.push(k);
            this.set.add(k.id);
        }

        this.imageList = [...this.imageList, ...addData];
        setImageList([...this.imageList]);

        //this.currentIdx++;
        this.currentIdx = Math.floor(this.imageList.length / 21);

        if(addData.length > 0)
            return {end: false};
        else
            return {end: true};
    }
    async getImageTop(setImageList) {
        if(this.set.size == 0)
            return await this.getImageBottom(setImageList);

        let recentID = await api.getRecentImageID();

        if(this.set.has(recentID)) {
            setImageList(this.imageList);
            return;
        }

        let addData = [];
        let pageIdx = 0;

        let isEnd = false;

        while(!isEnd) {
            // 이게 실행되는 타이밍에는 무조건 새로운 이미지가 있기 때문에 썸네일을 캐싱하지 않는게 이득이다
            let res = await thumbnailCacher.getImage(pageIdx, true);

            if(!res)
                return false;

            for(const k of res) {
                if(this.set.has(k.id)) {
                    isEnd = true;
                    break;
                }

                addData.push(k);
                this.set.add(k.id);
            }
            pageIdx++;
        }

        this.imageList = [...addData, ...this.imageList];
        setImageList(this.imageList);

        this.currentIdx = Math.floor(this.imageList.length / 21);
        return true;
    }
    getCurrentList(setImageList) {
        setImageList([...this.imageList]);
    }
    async getOriginalImage(id) {
        if(id in this.originalImages)
            return this.originalImages[id];

        let res = await fetch(await api.getOriginalImageUrl(id), {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            }
        });

        if(res.status != 200)
            return false;

        let blob = await res.blob();
        const img = URL.createObjectURL(blob);

        this.originalImages[id] = img;
        return img;
    }
    async clear() {
        this.currentIdx = 0;
        this.imageList = [];
        this.set.clear();
    }

    // imageList에서 아이디가 id인 이미지의 hearts, like를 수정한 결과를 반환한다
    updateImageList(imageList, setImageList, id, heartsFunc, like) {
        let res = [...imageList];

        for(let i=0; i<res.length; i++) {
            if(res[i].id != id)
                continue;

            res[i].hearts = heartsFunc(res[i].hearts);
            res[i].like = like;
        }

        setImageList(res);
    }

    async like(id, setImageList, weeklyImage, setWeeklyImage) {
        let fetchID = this.fetchID++;
        this.latestFetchID[id] = fetchID;

        let promise = api.like(id);

        this.updateImageList(this.imageList, setImageList, id, hearts => hearts+1, true);
        this.updateImageList(weeklyImage, setWeeklyImage, id, hearts => hearts+1, true);

        await promise;

        if(fetchID < this.latestFetchID[id]) {
            return;
        }

        let hearts = await api.getLikeCount(id);

        if(fetchID < this.latestFetchID[id]) {
            return;
        }

        this.updateImageList(this.imageList, setImageList, id, () => hearts, true);
        this.updateImageList(weeklyImage, setWeeklyImage, id, () => hearts, true);
    }
    async unlike(id, setImageList, weeklyImage, setWeeklyImage) {
        let fetchID = this.fetchID++;
        this.latestFetchID[id] = fetchID;

        let promise = api.unlike(id);
        
        this.updateImageList(this.imageList, setImageList, id, hearts => hearts-1, false);
        this.updateImageList(weeklyImage, setWeeklyImage, id, hearts => hearts-1, false);

        await promise;

        if(fetchID < this.latestFetchID[id]) {
            return;
        }

        let hearts = await api.getLikeCount(id);

        if(fetchID < this.latestFetchID[id]) {
            return;
        }

        this.updateImageList(this.imageList, setImageList, id, () => hearts, false);
        this.updateImageList(weeklyImage, setWeeklyImage, id, () => hearts, false);
    }
}

let imageManager = new ImageManager();
export default imageManager;