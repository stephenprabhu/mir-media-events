<template>
  <div class="eventItem">
    <div class="eventDateTimeSection">
      <div class="eventDate"><span class="weekday">{{ weekday }}, </span>{{ formattedDate }}</div>
      <div class="eventTime">{{ formattedTime }}</div>
    </div>
    <div class="child-2">
      <span class="eventCategory">{{ event.category }}</span>
      <h4 class="eventTitle">{{ event.title }}</h4>
      <p class="eventDesc">{{ event.description }}</p>
      <span class="eventLocation">{{ event.location }}</span>
    </div>
    <div class="buyTicketsSection">
      <BuyTickets />
      <div class="eventPrice">{{ event.price }}€</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BuyTickets from "~/components/events/BuyTickets.vue"
function convertTo12HourFormat(time: string): string {
    let [hours] = time.split(':').map(Number);
    let period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert '0' or '12' to '12', '13' to '1', etc.
    return `${hours} ${period}`;
}

function getThreeLetterWeekday(dateString: string): string {
    const date = new Date(dateString);
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getUTCDay()];
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}. ${month} ${year}`;
}

const {event} = defineProps(['event'])
const formattedTime: string = convertTo12HourFormat(event.time);
const weekday: string = getThreeLetterWeekday(event.date);
const formattedDate: string = formatDate(event.date);
</script>

<style>
.eventItem {
    display: grid;
    grid-template-columns: 10% 80% 10%;
}

.buyTicketsSection {
    justify-self: flex-end;
    text-align: right;
}

.eventPrice {
  font-size: 1em;
  margin-top: 0.5rem;
}


@media only screen and (max-width: 900px) {
  .eventItem {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

  }

  .eventDateTimeSection {
    display: flex;
    align-items: center;
  }

  .eventDateTimeSection .eventTime {
    margin-left: 0.5em;
  }

  .buyTicketsSection {
    text-align: left;
  }
}




</style>