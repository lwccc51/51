class PaperFlip {
    constructor() {
        this.currentPage = 0;
        this.papers = document.querySelectorAll('.paper');
        this.totalPages = this.papers.length;
        this.isFlipping = false;
        this.init();
    }

    init() {
        // 初始化所有纸张
        this.updatePaperStates();
        
        // 绑定按钮事件
        document.getElementById('nextBtn').addEventListener('click', () => this.flipNext());
        document.getElementById('prevBtn').addEventListener('click', () => this.flipPrev());
        
        // 支持键盘操作
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.flipNext();
            if (e.key === 'ArrowLeft') this.flipPrev();
        });
        
        // 支持鼠标点击纸张翻页
        this.papers.forEach((paper, index) => {
            paper.addEventListener('click', () => {
                if (index === this.currentPage) {
                    this.flipNext();
                }
            });
        });

        // 更新页码显示
        this.updatePageInfo();
    }

    flipNext() {
        if (this.isFlipping || this.currentPage >= this.totalPages - 1) return;
        
        this.isFlipping = true;
        
        // 添加翻转动画类
        this.papers[this.currentPage].classList.add('flipped');
        
        this.currentPage++;
        
        setTimeout(() => {
            this.updatePaperStates();
            this.updatePageInfo();
            this.isFlipping = false;
        }, 600);
    }

    flipPrev() {
        if (this.isFlipping || this.currentPage <= 0) return;
        
        this.isFlipping = true;
        
        this.currentPage--;
        
        // 移除翻转类，恢复纸张
        this.papers[this.currentPage].classList.remove('flipped');
        
        setTimeout(() => {
            this.updatePaperStates();
            this.updatePageInfo();
            this.isFlipping = false;
        }, 600);
    }

    updatePaperStates() {
        this.papers.forEach((paper, index) => {
            paper.classList.remove('next');
            
            if (index < this.currentPage) {
                // 已翻过的纸张
                paper.classList.add('flipped');
            } else if (index === this.currentPage) {
                // 当前显示的纸张
                paper.classList.remove('flipped');
                paper.classList.add('next');
            } else {
                // 未翻过的纸张
                paper.classList.remove('flipped');
                paper.classList.add('next');
            }
            
            // 更新z-index，保持正确的层叠顺序
            paper.style.zIndex = 100 - index;
        });
    }

    updatePageInfo() {
        document.getElementById('currentPage').textContent = this.currentPage + 1;
        document.getElementById('totalPages').textContent = this.totalPages;
        
        // 更新按钮状态
        document.getElementById('prevBtn').disabled = this.currentPage === 0;
        document.getElementById('nextBtn').disabled = this.currentPage === this.totalPages - 1;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new PaperFlip();
});
