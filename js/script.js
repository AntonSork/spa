
const CONTAINER_ID = 'root';
const DATA = [
    {
        name: 'History',
        id: 1,
        info:'The History interface allows manipulation of the browser session history, that is ' +
            'the pages visited in the tab or frame that the current page is loaded in.',
    },
    {
        name: 'CacheStorage',
        id: 2,
        info: 'The CacheStorage interface represents the storage for Cache objects.' + '\n' +
            'The interface:' + '\n' +
            '- Provides a master directory of all the named caches that can be accessed by a ServiceWorker or' +
            ' other type of worker or window scope (you’re not limited to only using it with service workers, even' +
            'though the Service Workers spec defines it).' + '\n' +
            '- Maintains a mapping of string names to corresponding Cache objects.',
    },
    {
        name: 'DOMParser',
        id: 3,
        info: 'The DOMParser interface provides the ability to parse XML or HTML ' +
            'source code from a string into a DOM Document.',
    },
    {
        name: 'Location',
        id: 4,
        info:'The Location interface represents the location (URL) of the object it is linked to. Changes done on it ' +
            'are reflected on the object it relates to. Both the Document and Window interface have such a linked' +
            ' Location, accessible via Document.location and Window.location respectively.',
    },
    {
        name: 'URLSearchParams',
        id: 5,
        info:'The URLSearchParams interface defines utility methods to work with the query string of a URL.\n' +
            '\n' +
            'An object implementing URLSearchParams can directly be used in a for...of structure, for example the ' +
            'following two lines are equivalent:',
    },
];

const ROOT_CONTAINER = document.getElementById(CONTAINER_ID);

const ITEMS_LIST = document.createElement('ul');
ITEMS_LIST.classList.add('list');

const ITEM_INFO = document.createElement('div');
ITEM_INFO.classList.add('item-info');
ITEM_INFO.id = 'info';

DATA.forEach(item => {
    const li = document.createElement('li');
    li.id = item.id;
    li.innerText = item.name;
    li.classList.add('list-item');
    ITEMS_LIST.appendChild(li);
});

ROOT_CONTAINER.appendChild(ITEMS_LIST);
ROOT_CONTAINER.appendChild(ITEM_INFO);

setActiveItemFromUrl(DATA, ITEMS_LIST);

ITEMS_LIST.addEventListener('click', event => {
    setCurrentId(event.target.id);
    updateAppState(DATA, ITEMS_LIST, event.target.id);
});

window.onpopstate = () => setActiveItemFromUrl(DATA, ITEMS_LIST);

function updateAppState(appData, itemsList, id) {
    let item = getItemById(appData, Number(id));
    if (!item) {
        item = appData[0];
        const newUrl = window.location.origin + `/?id=${item.id}`;
        window.history.replaceState({path:newUrl}, item.id ,newUrl);
    }
    ITEM_INFO.innerText = item.info;
    updateItemsState(itemsList, item.id);
}

function updateItemsState(itemsList, activeId) {
    itemsList.childNodes.forEach(item => {
        Number(item.id) === activeId ? item.classList.add('active') : item.classList.remove('active');
    });
}

function setActiveItemFromUrl(appData, itemsList) {
    const urlParams = new URLSearchParams(window.location.search);
    updateAppState(appData, itemsList, urlParams.get('id'));
}

function getItemById(appData, id) {
    return appData.find(item => item.id === id);
}

function setCurrentId(id) {
    const newUrl = window.location.origin + `/?id=${id}`;
    window.history.pushState({path:newUrl}, id ,newUrl);
}
