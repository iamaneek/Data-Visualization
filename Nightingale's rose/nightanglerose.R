

##install packages and build libraries
require(reshape2)
require(reshape)
install.packages("HistData")
library(HistData)


##Data Collection and Arrangement

data(Nightingale) #loads the data

#Data pre-processing
Night_data= Nightingale[,c(1,8:10)]
melted_data= melt(Night_data, "Date")
names(melted_data)= c("Date", "Cause", "Deaths")
melted_data$Cause= sub("\\.rate", "", melted_data$Cause)

##Data Manipulation
#change the names of categorical data viz. Other,Disease and Wounds

melted_data$Cause[melted_data$Cause=="Disease"]<- "Zymotic Disease"
melted_data$Cause[melted_data$Cause=="Wounds"]<- "Wounds & Injuries"

#divide the data into - before and after and arrange

melted_data$Regime <- ordered( rep(c(rep('Before', 12), rep('After', 12)), 3), 
                          levels=c('Before', 'After'))
Night_data <- melted_data

# divide into before and after subsets to help separate visualizations

before_night <- subset(Night_data, Date < as.Date("1855-04-01"))
after_night <- subset(Night_data, Date >= as.Date("1855-04-01"))

# sort according to deaths in decreasing order
before_night <- before_night[order(before_night$Deaths, decreasing=TRUE),]
after_night <- after_night[order(after_night$Deaths, decreasing=TRUE),]

#finally merge the two sorted files
Night_data <- rbind(before_night, after_night)


##Plot the data and generate required visualizations

# Before plot
before_plot <- ggplot(before_night, aes(x = factor(Date), y=Deaths, fill = Cause)) +
  scale_fill_manual("Causes", values = c("Zymotic Disease" = "#4da9ff", "Wounds & Injuries" = "#f09124", "Other" = "#750a0a"))+
  # do it as a stacked bar chart first
  geom_bar(width = 1, position="identity", stat="identity", color="black") +
  # set scale so area ~ Deaths	
  scale_y_sqrt() 
# A coxcomb plot = bar chart + polar coordinates
final_before_plot =before_plot  + coord_polar(start=3*pi/2) + 
  ggtitle("Before: Causes of Mortality in the Army in the East") + 
  xlab("")

final_before_plot #generate the before_plot

# After plot
after_plot <- ggplot(after_night, aes(x = factor(Date), y=Deaths, fill = Cause)) +
  scale_fill_manual("Causes", values = c("Zymotic Disease" = "#4da9ff", "Wounds & Injuries" = "#f09124", "Other" = "#750a0a"))+
  geom_bar(width = 1, position="identity", stat="identity", color="black") +
  scale_y_sqrt()
final_after_plot=after_plot + coord_polar(start=3*pi/2) +
  ggtitle("After: Causes of Mortality in the Army in the East") + 
  xlab("")

final_after_plot #generate the after_plot






