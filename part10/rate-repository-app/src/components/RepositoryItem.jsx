import { View, StyleSheet, Image } from 'react-native';

import theme from '../theme';
import Text from './Text';

// const styles = StyleSheet.create({
//     tinyLogo: {
//         width: 50,
//         height: 50,
//     },
// });

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

const RepositoryMetric = ({ label, count }) => {
    if (count >= 1000) {
        count = Math.round(count/1000*10)/10
        count = `${count}k`
    }
    return (
        <View style={styles.countItem}>
        <Text style={styles.countItemCount} fontWeight="bold">
            {count}
        </Text>
        <Text color="textSecondary">{label}</Text>
        </View>
    );
};

const RepositoryLogo = ({ link }) => (
    <View style={styles.avatarContainer}>
        <Image source={{ uri: link }} style={styles.avatar} />
    </View>
)

const RepositoryDescription = ({ item }) => (
    <View style={styles.contentContainer}>
        <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
        >
            {item.fullName}
        </Text>
        <Text style={styles.descriptionText} color="textSecondary">
            {item.description}
        </Text>
        {item.language ? (
            <View style={styles.languageContainer}>
                <Text style={styles.languageText}>
                    {item.language}</Text>
            </View>
        ) : null}
    </View>
)

const RepositoryItem = ({ item }) => {

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <RepositoryLogo link={item.ownerAvatarUrl} />
                <RepositoryDescription item={item} />
            </View>
        <View style={styles.bottomContainer}>
            <RepositoryMetric count={item.stargazersCount} label="Stars" />
            <RepositoryMetric count={item.forksCount} label="Forks" />
            <RepositoryMetric count={item.reviewCount} label="Reviews" />
            <RepositoryMetric count={item.ratingAverage} label="Rating" />
        </View>
    </View>
  );
};


// const RepositoryMetric = ({ metric, label }) => {
//   if (metric >= 1000) {
//     metric = Math.round(metric/1000*10)/10
//     metric = `${metric}k`
//   }
//   return (
//     <View style={{ flex: 3 }}>
//       <Text>{metric}</Text>
//       <Text>{ label }</Text>
//     </View>
//     )
// }

// const RepositoryLogo = ({ item }) =>
//     <View style={{flex: 1}}>
//         <Image
//             style={styles.tinyLogo}
//             source={{
//                 uri: item.ownerAvatarUrl,
//             }}
//         />
//     </View>
    
// const RepositoryDescription = ({ item }) =>
//     <View style={{ flex: 5 }}>
//         <Text>{item.fullName}</Text>
//         <Text>{item.description}</Text>
//         <Text style={{backgroundColor: '#0366d6'}}>{item.language}</Text>
//     </View>

// const RepositoryItem = ({ item }) => <View style={{backgroundColor: 'white', }}>
//     <View style={{ flexDirection: 'row'}}>
//         <RepositoryLogo item={item} />
        
//         <RepositoryDescription item={item} />
        
//     </View>
//     <View style={{ flexDirection: 'row' }}>
//         <RepositoryMetric metric={item.forksCount} label='Forks' />
//         <RepositoryMetric metric={item.stargazersCount} label='Stars' />
//         <RepositoryMetric metric={item.ratingAverage} label='Rating' />
//         <RepositoryMetric metric={item.reviewCount} label='Review' />
//     </View>
// </View>

export default RepositoryItem;