import React, { useContext, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonMenuButton, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonButton, IonModal, IonIcon } from '@ionic/react';
import ActivitiesContext, { Activity } from '../../data/activities-context';
import classes from './AllActivities.module.css';
import CompleteModalActivity from '../../components/CompleteActivityModal';
import { checkmarkOutline } from 'ionicons/icons';

const AllActivities: React.FC = () => {

    const [activityToComplete, setActivityToComplete] = useState<Activity>();

    const activitiesCtxt = useContext(ActivitiesContext);

    const openCompleteModal = (activity: Activity) => {
        setActivityToComplete(activity);
    };

    const closeModal = () => {
        setActivityToComplete(undefined);
    };

    return (
        <React.Fragment>
            <IonModal isOpen={!!activityToComplete}>
                <CompleteModalActivity activity={activityToComplete as Activity} dismissModal={closeModal}/>
            </IonModal>

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>All activities</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        { activitiesCtxt.activities.map(activity => (
                        <IonRow key={activity.id}>
                            <IonCol className="ion-text-center">
                                <IonCard>
                                    <img src={activity.imageUrl} alt="Activity"/>
                                    <IonCardHeader>
                                        <IonCardSubtitle>{activity.hour}</IonCardSubtitle>
                                        <IonCardTitle>{activity.title}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p>{activity.description}</p>
                                        <IonItem lines="none">
                                            { !activity.isCompleted ?
                                            <IonButton
                                                className={classes.CenterElement}
                                                fill="clear"
                                                onClick={() => openCompleteModal(activity)}>
                                                Complete Activity
                                            </IonButton>
                                            :
                                            <IonIcon color="success" className={classes.CenterElement} icon={checkmarkOutline} />
                                            }
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        ))
                        }
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default AllActivities;