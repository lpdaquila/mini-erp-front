/* 
- Formated date must be: dd/mm/yyyy hh:mm => 29/06/2025 20:00
- JavaScript pattern (ISO) -
 International pattern - yyyy-mm-dd hh:mm -> 2025-06-29 20:00
*/

export function useDate() {

    const formatDateForAPI = (value: string) => {
        // value = yyyy-mm-ddThh:mm -> dd/mm/yyyy hh:mm

        const [year, month, day, time] = value.replace('T', '-').split('-') // => ['yyyy', 'mm', 'dd', 'hh:mm']

        return `${day}/${month}/${year} ${time}`;
    }

    const formatAPIDate = (value: string) => {
        // value = yyyy-mm-ddThh:mm:ssZ -> dd/mm/yyyy hh:mm

        const [year, month, day, time] = value.slice(0, -4).replace('T', '-').split('-') // => ['yyyy', 'mm', 'dd', 'hh:mm']

        return `${day}/${month}/${year} ${time}`;
    }

    return {
        formatAPIDate,
        formatDateForAPI
    }
}

