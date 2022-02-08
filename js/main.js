class DataTable{
    element;
    headers;
    items;
    copyItems;
    selected;
    pagination;
    numberOfEntries;
    headerButtons;

    constructor(selector, headerButtons){
        this.element = document.querySelector(selector);

        this.headers = [];
        this.items = [];
        this.pagination = {
            total: 0, 
            noItemsPerPages: 0, 
            noPages: 0, 
            actual: 0, 
            pointer: 0, 
            diff:0,
            lastPageBeforeDots: 0,
            noButtonsBeforeDots: 4
        };
        this.selected = [];
        this.numberOfEntries = 5;
        this.headerButtons = headerButtons;

    }
    parse(){
        const headers = [... this.element.querySelector('thead tr').children];
        const trs = [... this.element.querySelector('tbody').children];

        headers.forEach(element => {
            this.headers.push(this.element.textContent);
        });

        trs.forEach(tr => {
            const cells = [... tr.children];
            const item = {
                id: this.generateUUID(),
                values: []
            };
            cells.forEach(cell =>{
                if(cell.children.length > 0){
                    //const status =  [... cell.children][0].getAtrribute('class');
                    const statusElement = [... cell.children][0];
                    if (status !== null){
                        item.values.push(`<span class='${status}'></span>`);
                    }
                }else{
                    item.values.push(cell.textContent);
                }
            });
            this.items.push(item);
        });
        console.log(this.items);

        this.makeTable();
    }

    makeTable(){
        this.copyItems = [... this.items];
        this.initPagination(this.items.length, this.numberOfEntries);

        const container = document.createElement('div');
        container.id = this.element.id;
        this.element.innerHTML = '0';
        this.element.replaceWith(container);
        this.element = this.container;

        this.createHTML();
        this.renderHeaders();
        this.renderRows();
        this.renderPagesButtons();
        this.renderHeaderButtons();
        this.renderSearch();
        this.renderSelectEntries();
    }
    initPagination(total, entries){
        this.pagination.total = total;
        this.pagination.noItemsPerPages = entries;
        this.pagination.noPages = Math.ceil(this.pagination.total / this.pagination.noItemsPerPages);
        this.pagination.actual = 1;
        this.pagination.pointer =  0;
        this.pagination.diff = this.pagination.noItemsPerPages - (this.pagination.total % this.pagination.noItemsPerPages);
    }

    generateUUID(){
        return (Date.now() * Math.floor(Math.random() * 10000)).toString();
    }

    createHTML(){
        this.element.innerHTML = `
        <div class="datatable_container">
        <div class="header_tools">
            <div class="tools">
                <ul>
                </ul>
            </div>
            <div class="search">
                <input type="text" name="" class="search_input">
            </div>
        </div>

        <div class="MyNewDatatable">
                <table id="smDatatable" class="datatable">
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
        </div>

        <div class="footer_tools">
            <div class="list_items">
                Show
                <select name="n-entries" id="n-entries" class="n_entries">
                </select>
                entries
            </div>
            <div class="pages">
            </div>
        </div>
    </div> 
        `;
    }
    renderHeaders(){
        this.element.querySelector('thead tr').innerHTML = '';

        this.headers.forEach(header =>{
            this.element.querySelector('thead tr').innerHTML = `<tr>${header}</tr>`;
        });
    }
    renderRows()
    renderPagesButtons()
    renderHeaderButtons()
    renderSearch()
    renderSelectEntries()
}