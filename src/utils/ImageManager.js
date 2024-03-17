import api from './API';

class ImageManager {
    currentIdx = 0;
    imageList = [];
    
    set = new Set();
    originalImages = {};

    async getImageBottom(setImageList) {
        let res = await api.getImage(this.currentIdx);

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
        setImageList(this.imageList);

        //this.currentIdx++;
        this.currentIdx = Math.floor(this.imageList.length / 21);
        return true;
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
            let res = await api.getImage(pageIdx);

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
        setImageList(this.imageList);
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
}

let imageManager = new ImageManager();
export default imageManager;