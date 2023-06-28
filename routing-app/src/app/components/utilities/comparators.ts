export class Comparators{
    
    static dateComparator(date1: any, date2: string) {
        var parsedDate1 = new Date(date1);
        var parsedDate2 = new Date(date2);
      
        if (parsedDate1 < parsedDate2) {
          return -1;
        } else if (parsedDate1 > parsedDate2) {
          return 1;
        } else {
          return 0;
        }
      }
}