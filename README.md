# Crumple
This software allows users to query across multiple CSV files at once.
This software utilizes the Electron framework. See the Electron documentation for more details: https://www.electronjs.org/

# Running the software
Run 'npm run start' from the main directory.

# Packaging a distributable
Modify the forge.config.js file with the desired packaging details. See the Electron Forge documentation for more details: https://www.electronforge.io/

Run 'npm run make' from the main directory.

# Using the software
Select files to read into the program's memory. It is assumed the first line in the file contains headers that apply to all records in that file. It is assumed each record has an entry, even blank, for each header.

Once files are loaded, build a query based on the headers and the desired value that corresponds to the selected header. The query parameters are combined in an 'AND' format (i.e., returned records will match all parameters). Values must match exactly, except for capital/lowercase and leading or trailing whitespace.
