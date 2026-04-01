import React from 'react';
import { View, Image } from 'react-native';

const DecorativeBanner = ({ styles }) => (
    <View style={styles.decorativeBanner}>
        <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrUysvJ3xM8m50yu5GDYzKTqKT9iUQ5fMx97mUxx1PJxuHoB386waoz1aqnApW0tBW6M981ai45bg7a3czlQf_c0l0enEf4i9Y8weyQfOq1JKFs0UofNl9PnRNfhT2ez5S9TdGG40-oGN3LKDeDp8VrbkbCcGOx73dGl63wDMkCX2yDwoam2LSUkWsD5bY_auriUYzoSwep9BK0Ij9-DWy1pNZ6CzgCUEXRmkx4JEIAetHZtb6uYsTYYJlX8pYNp9sfFiiDvRmJ5d3' }}
            style={styles.decorativeImage}
            resizeMode="cover"
        />
    </View>
);

export default DecorativeBanner;