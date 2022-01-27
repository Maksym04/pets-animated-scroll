import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {IPetsData} from '../types/types';
import {petsInfoData} from '../local/pets-info-data';
import PetsAnimatedArea from '../components/pets-animated-area/pets-animated-area';
import styles from './pets-page-styles';

const PetsPage: React.FC = () => {
  const [petsInformation] = useState<IPetsData[]>(petsInfoData);

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.background} />
          <View style={styles.petsScrollContainer}>
            <PetsAnimatedArea petsInformation={petsInformation} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PetsPage;
