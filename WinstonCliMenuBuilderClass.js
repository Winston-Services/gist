const WinstonUtilityQueueClass = require("./WinstonUtilityQueueClass");

module.exports = class WinstonCliMenuBuilderClass {
  _title = "";

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  _footer = "";

  get footer() {
    return this._footer;
  }

  set footer(value) {
    this._footer = value;
  }

  _maxWidth = 80;

  get maxWidth() {
    return this._maxWidth;
  }

  set maxWidth(value) {
    this._maxWidth = value;
  }

  _maxRows = 20;

  get maxRows() {
    return this._maxRows;
  }

  set maxRows(value) {
    this._maxRows = value;
  }

  _border = 4;

  get border() {
    return this._border;
  }

  set border(value) {
    this._border = value;
  }

  _spacer = "*";

  get spacer() {
    return this._spacer;
  }

  set spacer(value) {
    this._spacer = value;
  }

  _divider = "|";

  get divider() {
    return this._divider;
  }

  set divider(value) {
    this._divider = value;
  }

  _page = 0;

  get page() {
    return this._page;
  }

  set page(value) {
    this._page = value;
  }

  _items = new WinstonUtilityQueueClass();

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
  }

  get rowDivider() {
    return this._spacer.repeat(this._maxWidth);
  }

  get emptyRowDivider() {
    return (
      this._spacer.repeat(this._border) +
      this.formatLine(" ".repeat(this._maxWidth - this._border * 2)) +
      this._spacer.repeat(this._border)
    );
  }

  get menuHeader() {
    return (
      this._spacer.repeat(this._border) +
      this.formatLine(this.title) +
      this._spacer.repeat(this._border)
    );
  }

  formatLine(section) {
    let padding = 0;
    let split = 1;
    let stuffing = 0;
    if (this._border * 2 + section.length < this._maxWidth) {
      padding = this._maxWidth - (this._border * 2 + section.length);
    }
    if (padding % 2 === 0) {
      split = padding / 2;
      // console.log("Spitting", padding, split);
    } else {
      padding -= 1;
      split = padding / 2;
      stuffing = 1;
      // console.log("Padding has stuffing", padding);
    }

    return (
      " ".repeat(split) + " ".repeat(stuffing) + section + " ".repeat(split)
    );
  }

  get menuFooter() {
    return (
      this._spacer.repeat(this._border) +
      this.formatLine(this.footer) +
      this._spacer.repeat(this._border)
    );
  }
  _menuPage = '';

  get menuPage() {
    return this._menuPage;
  }

  set menuPage(value) {
    this._menuPage = value;
  }

  makeCommand({
    short_command,
    long_command,
  }) {
    return `(${short_command})${long_command.substring(short_command.length)}`;
  }

  buildMenuPages() {
    if(this.items.size % 2 === 0) {
      const q1 = [...this.items._queue].slice(0, this.items.size / 2);
      const q2 = [...this.items._queue].slice(this.items.size  / 2);
      let p = '';
      for (let i = 0; i <= q1.length - 1; i++) {
        p += this.menuRow(q1[i], q2[i]);
        if(i !== q1.length - 1) {
          p += "\n";
        }
      }
      this._menuPage = p;
    } else {
      //remove 1 to make it even
      const removed = this.items.pop();
      const q1 = [...this.items._queue].slice(0, this.items.size / 2);
      const q2 = [...this.items._queue].slice(this.items.size  / 2);
      let p = '';
      for (let i = 0; i <= q1.length - 1; i++) {
        p += this.menuRow(q1[i], q2[i]);
        if(i !== q1.length - 1) {
          p += "\n";
        }
      }
      p += "\n" + this.menuRow('', removed);
      this._menuPage = p;
    }
  }

  menuRow(item0, item1) {
    return (
      this._spacer.repeat(this._border) +
      this.formatLine(item0 + " " + this.divider + " " + item1) +
      this._spacer.repeat(this._border)
    );
  }

  addMenuItem(item) {
    this.items.enqueue(item);
  }
  
  removeMenuItem(item) {
    this.items.filter(item);
  }

  /**
   * N: "Next Menu"
   * h: "help"
   * c: "cancel"
   * q: "quit",
   */
  addStandardItems({disableNextPage, standardItems = ["(N)ext Menu", "(h)elp", "(c)ancel (q)uit"]}) {
    standardItems.forEach(item => {
      if(disableNextPage && item === '(N)ext Menu') return;
      this._items.enqueue(item);
    });
  }

  getMenu(page = 0) {
    return [
      this.rowDivider,
      this.menuHeader,
      this.rowDivider,
      this.emptyRowDivider,
      this.menuPage,
      this.emptyRowDivider,
      this.rowDivider,
      this.menuFooter,
      this.rowDivider
    ].join("\n");
  }

  static _instance = new WinstonCliMenuBuilderClass();

  static get instance() {
    return WinstonCliMenuBuilderClass._instance;
  }

  static set instance(value) {
    WinstonCliMenuBuilderClass._instance = value;
  }

  constructor() {
    return this;
  }
};
