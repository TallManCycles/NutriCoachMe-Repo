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
        message:
          'Yes, in an organization stature, this is a must. Besides, we need to quickly establish all other professional appearances, e.g., having a website where members’ profile will be displayed along with additional organizational information. Providing services to existing members is more important than attracting new members at this moment, in my opinion..',
        time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 1,
        message: 'What are you  doing?',
        time: {
          day: 'Thu',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 0,
        message: {
          text: `I took this pic`,
          attachment: chatImg1
        },
        status: 'seen',
        time: {
          day: 'Tue',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 1,
        message: 'Nothing!',
        status: 'seen',
        time: {
          day: 'Wed',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 0,
        message: 'How are you?',
        time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 6, 2019'
        }
      },
      {
        senderUserId: 1,
        message: 'Fine',
        status: 'delivered',
        time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 6, 2019'
        }
      },
      {
        senderUserId: 0,
        message: {
          text: `Check out my pics`,
          attachments: [
            chatImg7,
            chatImg8,
            chatImg9,
            chatImg10,
            chatImg11,
            chatImg12
          ]
        },
        status: 'sent',
        time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 7, 2019'
        }
      },

      {
        senderUserId: 1,
        message: 'I took some excellent images yesterday.',
        time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 7, 2019'
        }
      },
      {
        senderUserId: 0,
        message: 'Give me the images.',
        time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 8, 2019'
        }
      },
      {
        senderUserId: 1,
        message: {
          attachments: [
            chatImg1,
            chatImg2,
            chatImg3,
            chatImg4,
            chatImg5,
            chatImg6
          ]
        },
        messageType: 'attachment',
        attachment: '6 photos',
        time: {
          day: 'Tue',
          hour: '11:54 AM',
          date: 'May 8, 2019'
        }
      }
    ]
  }
  ,
  {
    id: 1,
    content: [
      {
        senderUserId: 2,
        message:
          'In an organization stature, this is a must. Besides, we need to quickly establish all other professional appearances, e.g. having a website where members’ profile will be displayed along with other organizations information. Providing services to existing members is more important than attracting new members at this moment, in my opinion.',
        time: {
          day: 'Mon',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 2,
        message: 'Your are right 👍',
        status: 'seen',
        time: {
          day: 'Sun',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 2,
        message: 'We should divide the tasks among all other members.',
        status: 'seen',
        time: {
          day: 'Sun',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 2,
        message: 'I will make a list of all the tasks.',
        status: 'seen',
        time: {
          day: 'Sun',
          hour: '11:54 AM',
          date: 'May 5, 2019'
        }
      },
      {
        senderUserId: 1,
        message: 'I can help you to do this.',
        status: 'seen',
        time: {
          day: 'Sun',
          hour: '11:54 AM',
          date: 'May 7, 2019'
        }
      },
      {
        senderUserId: 1,
        message:
          'It will be a great opportunity if I can contribute to this task 😊',
        status: 'seen',
        time: {
          day: 'Sun',
          hour: '11:54 AM',
          date: 'May 7, 2019'
        }
      },
      {
        senderUserId: 2,
        message: `Wow, it will be great!`,
        status: 'seen',
        time: {
          day: 'Sun',
          hour: '11:54 AM',
          date: 'May 7, 2019'
        }
      },
      {
        senderUserId: 1,
        message: `What do you think about the plan?`,
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
