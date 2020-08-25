#### forest 
data = read.csv('/Users/jiaxinli/git/gis-ws-19-20/Database/forest_data/forest_data.csv', header = FALSE,sep = ';')

data = as.data.frame(data)
data[data == 0] = NA

sum(is.na(data))
library(mice)
md.pattern(data)
library(lattice)
df1 = data

# head(df1)
df1 = df[-which(rowSums(is.na(df))>20),] 
sum(is.na(df1))
# missing value interpolation

rm = rowMeans(df1[,3:29],na.rm=TRUE);rm
sum(is.na(rm))
nr = nrow(df1);nr
nc = ncol(df1);nc
for (i in 1:nr) {
  for (j in 3:29) {
    if(is.na(df1[i,j])){
      
      df1[i,j] = rm[i]
 
    }
  }
}

df1 = df1[1:nr,]
sum(is.na(df1))
library(mice)
md.pattern(df1)

write.csv(df1, file = '/Users/jiaxinli/git/gis-ws-19-20/Database/forest_data/forest_data2.csv', col.names = FALSE)

# population
data = read.csv('/Users/jiaxinli/git/gis-ws-19-20/Database/population/population.csv', header = FALSE,sep = ';')

data = as.data.frame(data)
df = data
# head(df1)
df1 = df[-which(rowSums(is.na(df))>3),] 
sum(is.na(df1))
# missing value interpolation

rm = rowMeans(df1[,3:29],na.rm=TRUE);rm
sum(is.na(rm))
nr = nrow(df1);nr
nc = ncol(df1);nc
for (i in 1:261) {
  for (j in 3:29) {
    if(is.na(df1[i,j])){
      
      df1[i,j] = rm[i]
    }
  }
}

df1 = df1[1:261,]
sum(is.na(df1))
library(mice)
md.pattern(df1)

write.csv(df1, file = '/Users/jiaxinli/git/gis-ws-19-20/Database/population/population2.csv', col.names = FALSE)


#### gdp
data = read.csv('/Users/jiaxinli/git/gis-ws-19-20/Database/GDPpercapita/GDPpercapita.csv', header = FALSE,sep = ';')

data = as.data.frame(data)
df = data
# head(df1)
df1 = df[-which(rowSums(is.na(df))>5),] 
sum(is.na(df1))
# missing value interpolation

rm = rowMeans(df1[,3:29],na.rm=TRUE);rm
sum(is.na(rm))
nr = nrow(df1);nr
nc = ncol(df1);nc
for (i in 1:230) {
  for (j in 3:29) {
    if(is.na(df1[i,j])){
      
      df1[i,j] = rm[i]
    }
  }
}

df1 = df1[1:230,]
sum(is.na(df1))
library(mice)
md.pattern(df1)


write.csv(df1, file = '/Users/jiaxinli/git/gis-ws-19-20/Database/GDPpercapita/GDPpercapita.csv', col.names = FALSE)

#### co2
data = read.csv('/Users/jiaxinli/git/gis-ws-19-20/Database/CO2_emissions/CO2_emissions.csv', header = FALSE,sep = ';')

data = as.data.frame(data)
df = data
# head(df1)
df1 = df[-which(rowSums(is.na(df))>5),] 
sum(is.na(df1))
# missing value interpolation

rm = rowMeans(df1[,3:29],na.rm=TRUE);rm
sum(is.na(rm))
nr = nrow(df1);nr
nc = ncol(df1);nc
for (i in 1:242) {
  for (j in 3:29) {
    if(is.na(df1[i,j])){
      
      df1[i,j] = rm[i]
    }
  }
}

df1 = df1[1:nr,]
sum(is.na(df1))
library(mice)
md.pattern(df1)

write.csv(df1, file = '/Users/jiaxinli/git/gis-ws-19-20/Database/CO2_emissions/CO2_emissions2.csv', col.names = FALSE)

###　education
data = read.csv('/Users/jiaxinli/git/gis-ws-19-20/Database/education/education.csv', header = FALSE,sep = ';')

data = as.data.frame(data)
df = data
# head(df1)
df1 = df[-which(rowSums(is.na(df))>26),] 
sum(is.na(df1))
# missing value interpolation

rm = rowMeans(df1[,3:29],na.rm=TRUE);rm
sum(is.na(rm))
nr = nrow(df1);nr
nc = ncol(df1);nc
for (i in 1:182) {
  for (j in 3:29) {
    if(is.na(df1[i,j])){
      
      df1[i,j] = rm[i]
    }
  }
}

df1 = df1[1:nr,]
sum(is.na(df1))
library(mice)
md.pattern(df1)

write.csv(df1, file = '/Users/jiaxinli/git/gis-ws-19-20/Database/education/education2.csv', col.names = FALSE)
