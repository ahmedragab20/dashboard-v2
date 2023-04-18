<template>
  <div>
    <!-- <Chat
      :onSend="handleSendEvent"
      :chat="data"
      :bgColorHeader="darkTheme && '#1e1e1e'"
      :bgColorChat="darkTheme && '#2C2D2E'"
      :bgColorInput="darkTheme && '#1e1e1e'"
      :bgColorIcon="darkTheme && '#9B51E0'"
      :bgColorMessageChatbot="darkTheme && '#1e1e1e'"
      :bgColorMessagePerson="darkTheme && '#9B51E0'"
      :bgColorMessageTimestamp="darkTheme && '#1e1e1e'"
      :textColorInput="darkTheme && '#fff'"
      :textColorHeader="darkTheme && '#fff'"
      :textColorMessageChatbot="darkTheme && '#fff'"
      :textColorMessageTimestamp="darkTheme && '#fff'"
    /> -->
    hello chat
  </div>
</template>

<script>
  //   import { Chat } from '@chat-ui/vue3';
  //   import { computed, ref } from 'vue';
  //   import { useTheme } from 'vuetify';
  //   const theme = useTheme();
  //   const darkTheme = computed(() => theme.global.name.value === 'dark');
  //
  //   const data = ref([
  //     { message: 'Hi! How are you?', type: 'chatbot', timestamp: '3:45 PM' },
  //     { message: "Hello, i'm fine, thanks.", type: 'person', timestamp: '3:46 PM' },
  //     { message: 'How can i help you?', type: 'chatbot', timestamp: '3:47 PM' },
  //   ]);
  //
  //   function handleSendEvent(input) {
  //     if (input == '') return;
  //     const messagePerson = {
  //       type: 'person',
  //       timestamp: formatAMPM(new Date()),
  //       message: input,
  //     };
  //     data.value.push(messagePerson);
  //
  //     setTimeout(async () => {
  //       const response = await fetch('https://www.boredapi.com/api/activity');
  //       const res = await response.json();
  //       const messageChatbot = {
  //         type: 'chatbot',
  //         timestamp: formatAMPM(new Date()),
  //         message: res.activity,
  //       };
  //       data.value.push(messageChatbot);
  //     }, getRandomNumber());
  //   }
  //
  //   function getRandomNumber() {
  //     return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  //   }
  //
  //   function formatAMPM(date) {
  //     let hours = date.getHours();
  //     let minutes = date.getMinutes();
  //     let ampm = hours >= 12 ? 'PM' : 'AM';
  //     hours = hours % 12;
  //     hours = hours ? hours : 12; // the hour '0' should be '12'
  //     minutes = minutes < 10 ? '0' + minutes : minutes;
  //     let strTime = hours + ':' + minutes + ' ' + ampm;
  //     return strTime;
  //   }
</script>
