import imageFile1 from 'assets/img/products/3-thumb.png';
import imageFile2 from 'assets/img/icons/zip.png';
import imageMember1 from 'assets/img/team/1.jpg';
import imageMember2 from 'assets/img/team/2.jpg';
import imageMember3 from 'assets/img/team/3.jpg';

const autoCompleteInitialItem = [
  {
    id: 1,
    url: '#!',
    breadCrumbTexts: ['Pages ', ' Events'],
    catagories: 'recentlyBrowsedItems'
  },
  {
    id: 2,
    url: '#!',
    breadCrumbTexts: ['E-commerce ', ' Customers'],
    catagories: 'recentlyBrowsedItems'
  },
  {
    id: 3,
    catagories: 'suggestedFilters',
    url: '#!',
    key: 'customers',
    text: 'All customers list',
    type: 'warning'
  },
  {
    id: 4,
    catagories: 'suggestedFilters',
    url: '#!',
    key: 'events',
    text: 'Latest events in current month',
    type: 'success'
  },
  {
    id: 5,
    catagories: 'suggestedFilters',
    url: '#!',
    key: 'products',
    text: 'Most popular products',
    type: 'info'
  },
  {
    id: 6,
    catagories: 'suggestionFiles',
    url: '#!',
    img: imageFile1,
    file: true,
    title: 'iPhone',
    imgAttrs: {
      class: 'border h-100 w-100 fit-cover rounded-lg'
    },
    time: '<span class="fw-semi-bold">Antony</span><span class="fw-medium text-600 ms-2">27 Sep at 10:30 AM</span>'
  },
  {
    id: 7,
    catagories: 'suggestionFiles',
    url: '#!',
    img: imageFile2,
    file: true,
    title: 'Falcon v1.8.2',
    imgAttrs: {
      class: 'img-fluid'
    },
    time: '<span class="fw-semi-bold">John</span><span class="fw-medium text-600 ms-2">30 Sep at 12:30 PM</span>'
  },
  {
    id: 8,
    url: '#!',
    catagories: 'suggestionMembers',
    icon: {
      img: imageMember2,
      size: 'l',
      status: 'status-online'
    },
    title: 'Anna Karinina',
    text: 'Technext Limited'
  },
  {
    id: 9,
    url: '#!',
    catagories: 'suggestionMembers',
    icon: {
      img: imageMember1,
      size: 'l'
    },
    title: 'Antony Hopkins',
    text: 'Brain Trust'
  },
  {
    id: 10,
    url: '#!',
    catagories: 'suggestionMembers',
    icon: {
      img: imageMember3,
      size: 'l'
    },
    title: 'Emma Watson',
    text: 'Google'
  }
];

export default autoCompleteInitialItem;
