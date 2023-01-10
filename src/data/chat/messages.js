import chatImg1 from 'assets/img/chat/1.jpg';
import chatImg2 from 'assets/img/chat/2.jpg';
import chatImg3 from 'assets/img/chat/3.jpg';
import chatImg4 from 'assets/img/chat/4.jpg';
import chatImg5 from 'assets/img/chat/5.jpg';
import chatImg6 from 'assets/img/chat/6.jpg';
import chatImg7 from 'assets/img/chat/7.jpg';
import chatImg8 from 'assets/img/chat/8.jpg';
import chatImg9 from 'assets/img/chat/9.jpg';
import chatImg10 from 'assets/img/chat/10.jpg';
import chatImg11 from 'assets/img/chat/11.jpg';
import chatImg12 from 'assets/img/chat/12.jpg';

export default [
  {
    id: 0,
    content: [
      {
        senderUserId: 0,
        message: 'Test message 1',
         time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 1,
        message: 'Test message 2',
        time: {
          day: 'Thu',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      }
    ]
  },
  {
    id: 1,
    content: [
      {
        senderUserId: 2,
        message:
          'message 1',
          time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 1,
        message: 'message 2',
        status: 'seen',
        time: {
          day: 'Sun',
          hour: '11:54 AM',
          date: 'May 7, 2019'
        }
      }
    ]
  }
];
