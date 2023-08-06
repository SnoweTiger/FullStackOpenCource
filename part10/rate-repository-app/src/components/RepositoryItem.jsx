import { View, StyleSheet, Text, Image } from 'react-native';

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
    },
});


const RepositoryMetric = ({ metric, label }) => {
  if (metric >= 1000) {
    metric = Math.round(metric/1000*10)/10
    metric = `${metric}k`
  }
  return (
    <View style={{ flex: 3 }}>
      <Text>{metric}</Text>
      <Text>{ label }</Text>
    </View>
    )
}

const RepositoryLogo = ({ item }) =>
    <View style={{flex: 1}}>
        <Image
            style={styles.tinyLogo}
            source={{
                uri: item.ownerAvatarUrl,
            }}
        />
    </View>
    
const RepositoryDescription = ({ item }) =>
    <View style={{ flex: 5 }}>
        <Text>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <Text style={{backgroundColor: '#0366d6'}}>{item.language}</Text>
    </View>

const RepositoryItem = ({ item }) => <View style={{backgroundColor: 'white', }}>
    <View style={{ flexDirection: 'row'}}>
        <RepositoryLogo item={item} />
        
        <RepositoryDescription item={item} />
        
    </View>
    <View style={{ flexDirection: 'row' }}>
        <RepositoryMetric metric={item.forksCount} label='Forks' />
        <RepositoryMetric metric={item.stargazersCount} label='Stars' />
        <RepositoryMetric metric={item.ratingAverage} label='Rating' />
        <RepositoryMetric metric={item.reviewCount} label='Review' />
    </View>
</View>

export default RepositoryItem;