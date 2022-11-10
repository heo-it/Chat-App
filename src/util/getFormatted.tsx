import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export const formattedDate = (timestamp: Timestamp) => (
  dayjs(timestamp.toDate()).format('YYYY.MM.DD')
);

export const formattedTime = (timestamp: Timestamp) => (
  dayjs(timestamp.toDate()).format('HH:mm')
);