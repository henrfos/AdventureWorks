function download_table_as_csv(table_id, separator = ',') {
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    var csv = [];
    
    for (var i = 0; i < rows.length; i++) {
        var row = [],
            cols = rows[i].querySelectorAll('td, th');
        
        for (var j = 0; j < cols.length; j++) {
            var data = cols[j].innerText.trim(); 

            data = data.replace(/"/g, '');

            data = data.replace(/,/g, ' ');

            row.push(data);
        }
        
        csv.push(row.join(separator));
    }

    var csv_string = csv.join('\n');
    var filename = 'export_' + table_id + '_' + new Date().toISOString().slice(0, 10) + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function() {
    let exportButton = document.querySelector(".btn-warning");
    if (exportButton) {
        exportButton.addEventListener("click", function() {
            download_table_as_csv('table');
        });
    }
});