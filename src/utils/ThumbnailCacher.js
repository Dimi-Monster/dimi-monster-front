// ThumbnailCacher : 썸네일을 효율적으로 잘 캐싱해서 api.getImage 값을 효율적으로 불러오는 클래스
import api from "./API";

class ThumbnailCacher {
    thumbnails = {};
    thumbnailsCount = 0;
    lastPage = -1;

    localStorageLoaded = false;

    // loadThumbnail 값이 지정되면 그 값에 따라 작동하고, 지정되지 않으면 자동으로 지정한다
    async getImage(pageIdx, loadThumbnail) {
        console.log(`pageIdx: ${pageIdx}, thumbnailCount: ${this.thumbnailsCount}`);

        if(loadThumbnail === undefined) {
            if(pageIdx == 0) // 0페이지의 경우 썸네일을 못 불러올 가능성이 더 높다
                loadThumbnail = true;
            else if(pageIdx * 21 + 21 <= this.thumbnailsCount)
                loadThumbnail = false;
            else if(pageIdx == this.lastPage)
                loadThumbnail = false;
            else
                loadThumbnail = true;
        }

        let res = await api.getImage(pageIdx, loadThumbnail);

        if(!res)
            return false;

        if(res.length < 21)
            this.lastPage = pageIdx;
        else if(this.lastPage == pageIdx)
            this.lastPage = -1;

        if(loadThumbnail) {
            this.cacheThumbnails(res).then(() => console.log('Cache finished'));
            return res;
        }

        // 썸네일을 서버에서 불러오지 않은 경우, 썸네일이 전부 다 있는지 검증할 필요가 있다
        let isValid = true;

        for(const k of res) {
            if(!k.src && !(k.id in this.thumbnails)) {
                isValid = false;
                break;
            }
        }

        // 클라이언트가 가진 데이터와 실제 데이터가 한 페이지 이상 차이 날 경우 드물게 실패할 수 있다
        if(!isValid)
            return this.getImage(pageIdx, true);

        // 캐시 데이터에서 썸네일을 가져온다
        for(const k of res) {
            //k.src = this.thumbnails[k.id];
            k.src = await this.load(k.id);
        }

        return res;
    }

    async cacheThumbnails(data) {
        for(const k of data) {
            if(!(k.id in this.thumbnails))
                this.thumbnailsCount++;

            //this.thumbnails[k.id] = k.src;
            this.store(k.id, k.src);
        }
    }

    async store(id, src) {
        this.thumbnails[id] = src;

        //this.storeToStorage(); // 이거 await 안해도 되지 않을까? 안하는게 더 빠를거같은데
    }
    async load(id) {
        // if(!this.localStorageLoaded) {
        //     await this.loadFromStorage();
        //     this.localStorageLoaded = true;
        // }

        return this.thumbnails[id];
    }

    async loadFromStorage() {
        let data = JSON.parse(localStorage.getItem('thumbnails'));

        if(!data)
            data = [];

        for(const k of data) {
            this.thumbnails[k[0]] = k[1];
        }
        this.thumbnailsCount = localStorage.getItem('thumbnails-count');
    }
    async storeToStorage() {
        if(!this.localStorageLoaded)
            return;

        let data = [];

        for(const id in this.thumbnails) {
            data.push([id, this.thumbnails[id]]);
        }
        
        localStorage.setItem('thumbnails', JSON.stringify(data));
        localStorage.setItem('thumbnails-count', this.thumbnailsCount);
    }
}

const thumbnailCacher = new ThumbnailCacher();
export default thumbnailCacher;