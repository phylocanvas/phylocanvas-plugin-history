import { Tree, utils } from 'phylocanvas';

const { addClass, hasClass, removeClass } = utils.dom;
const { fireEvent, addEvent, killEvent } = utils.events;

class History {

  constructor(tree, { isCollapsed = true, unstyled }) {
    this.tree = tree;
    this.snapshots = [];

    if (!unstyled) {
      require('./style.css');
    }

    this.container = this.createElements(tree.containerElement);

    this.tree.addListener('subtree', ({ node }) => this.addSnapshot(node));
    this.tree.addListener('loaded', () => this.addSnapshot(this.tree.root.id));

    this.tree.addListener(
      'typechanged', () => this.addSnapshot(this.tree.root.id)
    );

    if (isCollapsed) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  collapse() {
    addClass(this.container, 'collapsed');
    this.toggleDiv.firstChild.data = '>';
    this.resizeTree();
    this.tree.draw();
  }

  expand() {
    removeClass(this.container, 'collapsed');
    this.toggleDiv.firstChild.data = '<';
    this.resizeTree();
    this.tree.draw();
  }

  isCollapsed() {
    return hasClass(this.container, 'collapsed');
  }

  toggle() {
    if (this.isCollapsed()) {
      this.expand();
    } else {
      this.collapse();
    }
    fireEvent(this.tree.containerElement, 'historytoggle', { isOpen: !this.isCollapsed() });
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

    const tabDiv = document.createElement('div');
    tabDiv.appendChild(document.createTextNode('<'));
    tabDiv.className = 'toggle';
    addEvent(tabDiv, 'click', this.toggle.bind(this));
    container.appendChild(tabDiv);
    this.toggleDiv = tabDiv;

    const snapshotList = document.createElement('ul');
    snapshotList.className = 'phylocanvas-history-snapshots';
    container.appendChild(snapshotList);
    this.snapshotList = snapshotList;

    parentElement.appendChild(container);
    return container;
  }

  resizeTree() {
    const tree = this.tree;
    this.width = this.container.offsetWidth;
    tree.setSize(tree.containerElement.offsetWidth - this.width, tree.containerElement.offsetHeight);
    if (this.isCollapsed()) {
      tree.containerElement.getElementsByTagName('canvas')[0].style.marginLeft = this.width + 'px';
    } else {
      tree.containerElement.getElementsByTagName('canvas')[0].style.marginLeft = '20%';
    }
  }

  addSnapshot(id) {
    if (!id) return;

    const historyIdPrefix = 'phylocanvas-history-';
    const treetype = this.tree.treeType;
    let historyAlreadyPresent = false;

    this.snapshots.forEach(function (ele) {
      ele.style.background = 'transparent';
      if (ele.id === historyIdPrefix + id && ele.getAttribute('data-tree-type') === treetype) {
        historyAlreadyPresent = true;
        ele.style.background = '#9BB7BF';
      }
    });

    if (historyAlreadyPresent) {
      return;
    }
    const url = this.tree.getPngUrl();
    const listElement = document.createElement('li');
    const thumbnail = document.createElement('img');

    thumbnail.width = this.width;
    thumbnail.src = url;
    thumbnail.id = historyIdPrefix + id;
    thumbnail.setAttribute('data-tree-type', this.tree.treeType);
    thumbnail.style.background = '#9BB7BF';

    this.snapshots.push(thumbnail);

    listElement.appendChild(thumbnail);
    this.snapshotList.appendChild(listElement);

    addEvent(thumbnail, 'click', this.goBackTo.bind(this));
  }

  clear() {
    const listElements = this.snapshotList.getElementsByTagName('li');
    for (let i = listElements.length; i--;) {
      this.snapshotList.removeChild(listElements[0]);
    }
    this.snapshots.length = 0;
  }

  goBackTo({ target }) {
    const id = target.id.replace('phylocanvas-history-', '');
    this.tree.setTreeType(target.getAttribute('data-tree-type'), true);
    this.tree.redrawFromBranch(this.tree.originalTree.branches[id]);
  }

}

export default function historyPlugin(decorate) {
  decorate(this, 'createTree', function (delegate, args) {
    const tree = delegate(...args);
    const [ , config = {} ] = args;
    if (config.history || typeof config.history === 'undefined') {
      tree.history = new History(tree, config.history);
    }
    return tree;
  });

  decorate(Tree, 'resizeToContainer', function (delegate) {
    if (!this.history || !this.history.resizeTree) {
      return delegate.apply(this);
    }
    this.history.resizeTree();
  });

  this.History = History;
}
