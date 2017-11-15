
# Consumer Financial Protection Bureau Complaints Visualization

The visualization can be seen [here](https://emilyw15.github.io/CFPB-Complaints/).

## Overview

This visualization shows data from the Consumer Financial Protection Bureau (CFPB) [public complaints database](https://catalog.data.gov/dataset/consumer-complaint-database). Each chart shows a diiferent breakdown of the complaints based on Date, Issue, Company, and State and how many complaints each of the breakdowns received. 

To help make this visualization, I started with the following questions:
- How does the number of complaints change over time?
- What are the most common breakdowns of product and issue?
- What companies receive the most complaints?
- Where are the most complaints coming from around the United States (total or by product)?



## Data, Cleaning, and Aggregation

The original dataset contains data from 2011 – 2017. There are 14 columns that describe a complaint submitted to the CFPB. A complaint can have a product, sub-product, issue and sub-issue. Complaints are also associated with a company, a state where the complaint is from and the company response for the complaint. 
The 14 columns are as followed:

| Column               | Description                                 |
| -------------------- | ------------------------------------------- |
| Date Received        | Date the cfpb recieved complaint            |
| Product              | The product the complaint is about          |
| Sub-product          | The sub-product the complaint is about      |
| Issue                | The issue the complaint is about            |
| Sub-issue            | The sub-issue the complaint is about        |
| Narrative            | The written complaint that consumer wrote   |
| Company Response     | The public response the company gave        |
| Company              | The company the complaint is about          |
| State                | The state the complaint came from           | 
| Zip code             | The zip code the complaint came from        |
| Tags                 | Predetermined codes to describe consumer    |
| Consumer consent     | Whether consumer gave permission to publish |
| Date Sent            | Date the cfpb sent complaint to company     |
| Response to Consumer | Response company gave to consumer           |
| Timely Response      | Was company response timely                 |
| Consumer Disputed    | Did consumer dispute the response           |
| Complaint ID         | Unique ID given to every complaint          |

To work with the data I only kept the columns that were necessary for my visualizations. These columns were date received, product, issue, company and state. To reduce the amount of data even more I used SQL to group the data by those five columns. I also removed data from 2011 and 2017 because both years did not have complete years. Fianlly, there were over 4,000 companies so I removed companies that appeared in the data less than 1,000 times. 

While making the visualizations, I aggregated the data even more using d3.nest(), grouping by only the columns I needed for that visualization. 

## Visualizations and Interactions

The first visualization on the page is a stacked area chart. This visualization was made to answer the first question above. The x-axis is dates by month for each year and the y-axis is complaint count. The color of the areas represent the different products. From this chart, the viewer can see that the CFPB began by only recieving complaints for Mortgages and Credit cards, as time goes on each of the products were added. The chart also shows that the complaints the CFPB recieves the most of is Mortgage, followed by Credit reporting later on. The interaction with this chart is when the user hovers over each area the product of that area appears at the top of the graph.

The second visualization on the page is a stacked bar chart. This visualization was made to answer the second question above. The x-axis is issues and the y-axis is complaint count. The color of the bars represent the different products. From this chart, the viewer can see that most issues only apply to one type of product. The chart also shows that a lot of people complained about the issue concerning loan modification and information on their credit report. For each product, there are some issues that have more complaints than other. For example, for credit card complaints many people have issues with billing. The interaction with this chart is when the user hovers over each bar, a tooltip appears to tell the user how many complaints were sent in for that product-issue pair.

The third visualization on the page is also a stacked bar chart. This visualization was made to answer the third question above. The x-axis is companies and the y-axis is complaint count. The color of the bars represent the different products. From this chart, the viewer can see that some companies receive complaints for multiple products while others receive complaints for only one product. The chart also shows that banks tend to receive more complaints followed by the three major credit reporting agencies. Bank of America receives the most complaints from this group of companies, as well as it receives complaints for a variety of products. Equifax, however, only receives complaints on credit reporting. The interaction with this chart is when the user hovers over each bar, a tooltip appears to tell the user how many complaints were sent in for that product-company pair. 

The fourth visualization on the page is also a stacked bar chart. This visualization was made to answer the fourth question above. The x-axis is state and the y-axis is complaint count. The color of the bars repersent the different products. From this chart, the viewer can see that all the states send in complaints for most products. The chart also shows that California and Florida send the most complaints to the CFPB. It is interesting that almost half of the complaints that California sends are about mortgages, while most other states send equal amounts of complaints for each product. The interaction with this chart is when the user hovers over each bar, a tooltip appears to tell the user how many complaints were sent in for that product-state pair. 

## Early Prototypes

Some early prototypes of visualization using this data can be found on [bl.ocks.org](https://bl.ocks.org/emilyw15). These visualizations were made using data from January, February and March 2017

- [Summary of CFPB Data](https://bl.ocks.org/emilyw15/553e8acc8bccf2a4237a3e977e70568d)
- [Line chart of Student Loan Complaints](https://bl.ocks.org/emilyw15/b8fe8d2b0c9ae26f8d7fd4758a780737)
- [Multi-Line chart of all products](https://bl.ocks.org/emilyw15/a3f1d922d616a9a5f88c3c71af1408d2)
- [Scatter plot of all products](https://bl.ocks.org/emilyw15/4fe109b3c8eebc1996bcae158b7aab89)
