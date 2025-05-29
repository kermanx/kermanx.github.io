import { readdirSync } from 'node:fs';

export default {
  watch: ['./*.md'],
  load() {
    const days: {
      [date: string]: {
        name: string,
        link: string,
      }
    } = {};
    for (const file of readdirSync(import.meta.dirname)) {
      const match = file.match(/^(\d{4}-\d{2}-\d{2})-(\w+?)\.md$/);
      if (match) {
        const [_, date, name] = match;
        days[date] = {
          name,
          link: `/PL/${file.slice(0, -3)}.html`,
        };
      }
    }
    return days;
  }
}
