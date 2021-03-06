import { Component, Mixins, Prop, Emit, Watch, Inject } from "vue-property-decorator";
import RctTablePaginationTpl from "./pagination.component.vue";

@Component
export class RctTablePagination extends Mixins(RctTablePaginationTpl) {

    @Prop({ default: 0, type: Number }) total: number;
    @Prop({ default: 25 }) count: number;
    @Prop({ default: 1 }) page: number;
    @Prop({ default: () => [25, 50, 100] }) pageOptions: number[];
    @Prop({ default: "Rows per page:" }) label: string;
    @Prop({ default: "of" }) separator: string;
    @Prop({ default: false }) inprogress: boolean;

    public currentPageSize: number = 0;

    @Emit("update:page")
    public goToNext():number {
        return this.page + 1
    };

    @Emit("update:page")
    public goToPrev():number {
        return this.page - 1
    };

    @Emit("update:count")
    public setPageSize():number {
        return this.currentPageSize
    };

    @Watch("mdPageSize", {immediate: true})
    public onMdPageSize():void {
        this.currentPageSize = this.count
    };

    // // @Watch("mdPage", {immediate: true})
    // // public onMdPage(value):void {
    // //     this.currentPageSize = this.mdPageSize
    // // };

    public get lastPage():number {
        if (this.total == 0) {
            return 1
        };
        if (this.total%this.count == 0) {
            this.total % this.count
        };
        return Math.trunc(this.total / this.count) + 1
    };

    public get currentItemCount():number {
        return ((this.page - 1) * this.count) + 1
    };

    public get currentPageCount():number {
        return ((count) => {
            if (count > this.total) return this.total
            else return count
        })(this.page * this.count);
    };

    public get isFirstPage():boolean {
        return this.page == 1
    };

    public get isLastPage():boolean {
        return this.page == this.lastPage
    };

    // // public get totalPages():number {
    // //     if (this.total % this.mdPageSize != 0) {
    // //         return this.total / this.mdPageSize + 1
    // //     } else {
    // //         return this.total / this.mdPageSize
    // //     };
    // // };

}