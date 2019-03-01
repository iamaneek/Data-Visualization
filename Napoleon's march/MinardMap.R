
#Load required packages
require(ggplot2)
require(scales)
require(gridExtra)
require(dplyr)
require(tidyverse)
require(HistData)
require(ggmap)
require(ggrepel)
require(reshape2)


#load the data from HistData
data(Minard.troops)
data(Minard.cities)
data(Minard.temp)





# plot path of troops, and another layer for city names



march.1812.ne.europe.map = get_stamenmap(bbox = march.1812.ne.europe,zoom = 9 ,
                                          maptype = "watercolor", where = "cache")
march.1812.plot = ggmap(march.1812.ne.europe.map) + geom_path(data = Minard.troops, aes(x = long, y = lat, group = group, 
                                                                                         color = direction, size = survivors),lineend = "round",linejoin = "round") +
scale_color_manual("direction", values = c("A" = "#f09124", "R" = "#bf3131"))+ 
geom_point(data = Minard.cities, aes(x = long, y = lat),color = "black") +
geom_text_repel(data = Minard.cities, aes(x = long, y = lat, label = city),
                        color = "black", family = "Open Sans Condensed Bold") +
scale_size(range = c(1.5, 7)) + theme_nothing()



march.1812.plot




#plot temperature vs. longitude
plot_temp = ggplot(Minard.temp, aes(long, temp)) +
  geom_path(color="#f0b056", size=2.5) +
  geom_point(size=2) +
  geom_text(aes(label=date)) +
  xlab("Longitude") + ylab("Temperature") +
  ggtitle("Napoleon's march to Russia")+
  coord_cartesian(xlim = c(24, 38)) + 
  theme_bw()

plot_temp


#Combine the two plots into one

grid.arrange( march.1812.plot, plot_temp, nrow=2, ncol=1)





