import api from './API';

class ImageManager {
    currentIdx = 0;
    imageList = [];
    
    set = new Set();

    async getImageBottom(setImageList) {
        console.log(this.imageList);

        let res = await api.getImage(this.currentIdx);

        if(!res)
            return false;

        console.log(res);

        let addData = [];
        for(const k of res) {
            if(this.set.has(k.id))
                continue;

            addData.push(k);
            this.set.add(k.id);
        }
        console.log(this.set);

        this.imageList = [...this.imageList, ...addData];
        setImageList(this.imageList);

        //this.currentIdx++;
        this.currentIdx = Math.floor(this.imageList.length / 20);
        return true;
    }
    async getImageTop() {

    }
}

let imageManager = new ImageManager();
export default imageManager;