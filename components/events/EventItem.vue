<template>
  <div class="eventItem" role="article" aria-labelledby="event-title-{{ event.id }}">
    <div class="eventDateTimeSection">
      <div class="eventDate" aria-label="Event Date"><span class="weekday">{{ weekday }}, </span>{{ formattedDate }}</div>
      <div class="eventTime" aria-label="Event Time">{{ formattedTime }}</div>
    </div>
    <div class="eventDetailsSection">
      <span class="eventCategory">{{ event.category }}</span>
      <h4 id="event-title-{{ event.id }}" class="eventTitle">{{ event.title }}</h4>
      <p class="eventDesc">{{ event.description }}</p>
      <span class="eventLocation" aria-label="Event Location">{{ event.location }}</span>
    </div>
    <div class="buyTicketsSection">
      <BuyTickets />
      <div class="eventPrice" aria-label="Event Price">{{ event.price }}€</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BuyTickets from "@/components/events/BuyTickets.vue"
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

<style scoped lang="scss">
 .eventItem {
    display: grid;
    grid-template-columns: 10% 80% 10%;

    @media only screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
        row-gap: 0.6em;
    }

    .eventDateTimeSection {
      display: block;
      
      @media only screen and (max-width: 900px) {
        display: flex;
        align-items: center;
      }

      .eventDate {
        font-weight: 300;

        .weekday {
          font-weight: bold;
        }
      }
      .eventTime {
          font-weight: bold;
          
          @media only screen and (max-width: 900px) {
            margin-left: 0.5em;
          }
      }
    }

    .eventDetailsSection {
      .eventTitle {
        font-weight: bold;
        font-size: 1.5em;
        margin-top: 0.3em;
      }
      .eventDesc {
        font-weight: 400;
        font-size: 1.25em;
        margin: 0;
      }

      .eventLocation {
          font-size: 0.75em;
      }

      .eventCategory {
          @include dark-box;
          padding: 2px 4px;
          font-size: 0.8rem;
      }
    }

    .buyTicketsSection {
      justify-self: flex-end;
      text-align: right;

      @media only screen and (max-width: 900px) {
        text-align: left;
      }

      .eventPrice {
        font-size: 1em;
        margin-top: 0.5rem;
      }
    }
}

</style>