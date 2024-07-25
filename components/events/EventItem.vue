<template>
  <li class="eventItem" role="listitem" aria-labelledby="event-title-{{ event.id }}">
    <div class="eventDateTimeSection">
      <time :datetime="event.date" class="eventDate" aria-label="Event Date">
        <span class="weekday">{{ weekday }}, </span>{{ formattedDate }}
      </time>
      <time :datetime="event.time" class="eventTime" aria-label="Event Time">{{ formattedTime }}</time>
    </div>
    <div class="eventDetailsSection">
      <span class="eventCategory">{{ event.category }}</span>
      <h4 id="event-title-{{ event.id }}" class="eventTitle">{{ event.title }}</h4>
      <p class="eventDesc">{{ event.description }}</p>
      <span class="eventLocation" aria-label="Event Location">{{ event.location }}</span>
    </div>
    <div class="buyTicketsSection">
      <DarkButtton label="Buy Tickets">
        Buy Tickets <img src="@/assets/images/shop.png" alt="Shop Icon" />
      </DarkButtton>
      <div class="eventPrice" aria-label="Event Price">{{ event.price }}€</div>
    </div>
  </li>
</template>

<script lang="ts" setup>
  import DarkButtton from "../general/DarkButtton.vue";
  function convertTo12HourFormat(time: string): string {
      let [hours] = time.split(':').map(Number);
      let period = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
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
    grid-template-columns: 15% 70% 15%;
    margin-bottom: $desktop-default-spacing;
    width: 100%;

    @media only screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
        row-gap: $mobile-default-spacing;
        margin-bottom: $mobile-default-spacing;
    }

    .eventDateTimeSection {
      display: block;
      font-size: 18px;
      
      @media only screen and (max-width: 900px) {
        display: flex;
        font-size: 16px;
        align-items: center;
      }

      .eventDate {
        font-weight: 300;
        display: block;

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
        font-weight: 700;
        font-size: 48px;
         line-height: 120%;

        @media only screen and (max-width: 900px) {
          font-size: 32px;
        }
      }
      .eventDesc {
        font-weight: 400;
        font-size: $desktop-default-spacing;
        margin: 0;
        line-height: 120%;
        @media only screen and (max-width: 900px) {
          font-size: $mobile-default-spacing;
        }
      }

      .eventLocation {
          font-size:18px;
          @media only screen and (max-width: 900px) {
          font-size: 16px;
          line-height: 120%;
        }
      }

      .eventCategory {
          @include dark-box;
          padding: 2px 4px;
          font-size: 14px;
      }
    }

    .buyTicketsSection {
      justify-self: flex-end;
      text-align: right;

      @media only screen and (max-width: 900px) {
        text-align: left;
      }

      .eventPrice {
        font-size: 18px;
        margin-top: 0.5rem;
        @media only screen and (max-width: 900px) {
          font-size: 16px;
        }
      }
    }
  }

</style>