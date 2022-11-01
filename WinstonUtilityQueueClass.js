module.exports = class WinstonUtilityQueueClass {
  static _instance = new WinstonUtilityQueueClass();

  static get instance() {
    return WinstonUtilityQueueClass._instance;
  }

  static set instance(value) {
    WinstonUtilityQueueClass._instance = value;
  }

  _lastOut;
  get lastOut() {
    return this._lastOut;
  }
  set lastOut(value) {
    this._lastOut = value;
  }

  constructor() {
    this._queue = [];
    return this;
  }

  enqueue(value) {
    this._queue.push(value);
    return this._queue;
  }

  prioritize(value) {
    this._queue.unshift(value);
    return this._queue;
  }

  dequeue() {
    this._lastOut = this._queue.shift();
    return this._queue;
  }

  splice(start, deleteCount) {
    this._queue = this._queue.splice(start, deleteCount);
  }

  slice(start, end) {
    this._queue = this._queue.slice(start, end);
  }

  filter(item) {
    //Winston.instance.contains(_item, item)
    this._queue = this._queue.filter((_item) => _item === item);
  }
  
  scope(key) {
    return { scope: this._queue[key] };
  }

  pop() {
    return this._queue.pop();
  }
  get length() {
    return this._queue.length;
  }

  get size() {
    return this._queue.length;
  }
}