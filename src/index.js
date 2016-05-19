import { utils } from 'phylocanvas';

const { addClass, removeClass } = utils.dom;
const { fireEvent, addEvent, killEvent } = utils.events;

const snapshotClass = 'phylocanvas-history-snapshot';
const snapshotSelectedClass = `${snapshotClass}--selected`;

class History {

  constructor(tree, { unstyled, parentElement = tree.containerElement }) {
    this.tree = tree;
    this.snapshots = [];

    if (!unstyled) {
      require('./style.css');
      this.tree.containerElement.style.overflow = 'hidden';
    }

    this.isOpen = false;
    this.container = this.createElements(parentElement);

    this.tree.addListener('subtree', ({ node }) => this.addSnapshot(node));
    this.tree.addListener('loaded', () => this.addSnapshot(this.tree.root.id));

    this.tree.addListener(
      'typechanged', () => this.addSnapshot(this.tree.root.id)
    );
  }

  toggle() {
    this.isOpen = !this.isOpen;
    (this.isOpen ? addClass : removeClass)(
      this.container, 'phylocanvas-history--open'
    );

    fireEvent(
      this.tree.containerElement, 'historytoggle', { isOpen: this.isOpen }
    );
  }

  createElements(parentElement) {
    const container = document.createElement('div');
    container.className = 'phylocanvas-history';
    addEvent(container, 'click', killEvent);
    addEvent(container, 'contextmenu', killEvent);

    const title = document.createElement('div');
    title.innerHTML = 'History';
    title.className = 'phylocanvas-history-title';
    container.appendChild(title);

    const button = document.createElement('button');
    button.className = 'phylocanvas-history-button';
    button.title = 'History';
    addEvent(button, 'click', this.toggle.bind(this));
    container.appendChild(button);
    this.button = button;

    const snapshotList = document.createElement('ul');
    snapshotList.className = 'phylocanvas-history-snapshots';
    container.appendChild(snapshotList);
    this.snapshotList = snapshotList;

    parentElement.appendChild(container);
    return container;
  }

  addSnapshot(id) {
    if (!id) return;

    const treetype = this.tree.treeType;
    let historyAlreadyPresent = false;

    this.snapshots.forEach(element => {
      removeClass(element, snapshotSelectedClass);
      if (element.getAttribute('data-tree-root') === id &&
          element.getAttribute('data-tree-type') === treetype) {
        historyAlreadyPresent = true;
        addClass(element, snapshotSelectedClass);
      }
    });

    if (historyAlreadyPresent) {
      return;
    }

    const url = this.tree.getPngUrl();
    const listElement = document.createElement('li');
    listElement.className = `${snapshotClass} ${snapshotSelectedClass}`;
    listElement.setAttribute('data-tree-root', id);
    listElement.setAttribute('data-tree-type', this.tree.treeType);
    listElement.className = `${snapshotClass} ${snapshotSelectedClass}`;

    const thumbnail = document.createElement('img');
    thumbnail.src = url;

    this.snapshots.push(listElement);

    listElement.appendChild(thumbnail);
    this.snapshotList.appendChild(listElement);

    addEvent(listElement, 'click', this.goBackTo.bind(this, listElement));
  }

  clear() {
    for (let i = this.snapshots.length; i--;) {
      this.snapshotList.removeChild(this.snapshots[0]);
    }
    this.snapshots.length = 0;
  }

  goBackTo(snapshot) {
    const id = snapshot.getAttribute('data-tree-root');
    this.tree.setTreeType(snapshot.getAttribute('data-tree-type'), true);
    this.tree.redrawFromBranch(this.tree.originalTree.branches[id]);
  }

}

export default function historyPlugin(decorate) {
  decorate(this, 'createTree', (delegate, args) => {
    const tree = delegate(...args);
    const [ , config = {} ] = args;
    tree.history = new History(tree, config.history || {});
    return tree;
  });

  this.History = History;
}
