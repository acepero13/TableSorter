import { SortingOptions, Direction } from "./options/SortingOptions";
import { TableSorter } from "./table/TableSorter";



jQuery(document).ready(() => {

    const table = jQuery("#table");
    table.find(".header").click(function (event) {
        const index = $(this).parent().children().index($(this));
        const options = new SortingOptions(Direction.Ascending, index, true);
        const tableSorter = new TableSorter(table, options);
        tableSorter.sort();
    });



    const table2 = jQuery("#table2");
    table2.find(".header").click(function (event) {
        const index = $(this).parent().children().index($(this));
        const options = new SortingOptions(Direction.Ascending, index, true);
        const tableSorter = new TableSorter(table2, options);
        tableSorter.sort();
    });
});

