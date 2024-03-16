import api from './API';

class ImageManager {
    currentIdx = 0;
    imageList = [];
    
    set = new Set();

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
        this.currentIdx = Math.floor(this.imageList.length / 20);
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

        this.currentIdx = Math.floor(this.imageList.length / 20);
        return true;
    }
}

let imageManager = new ImageManager();
export default imageManager;