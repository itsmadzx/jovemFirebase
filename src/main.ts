import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { addIcons } from 'ionicons'; //importando os ion-icon pro projeto inteiro
import {
  home,
  personOutline,
  schoolOutline,
  briefcaseOutline,
  chatbubbleOutline,
  notificationsOutline,
  searchOutline,
  documentTextOutline,
  locateOutline,
  arrowForwardOutline,
  chevronForwardOutline,
  timeOutline,
  ribbonOutline,
  locationOutline,
  accessibilityOutline,
  settingsOutline,
  saveOutline,
  flagOutline,
  chatboxEllipsesOutline,
  constructOutline,
  languageOutline,
  addCircleOutline,
  trashOutline,
  eyeOutline,
  mailOutline,
  callOutline,
  checkmarkCircleOutline,
  bookOutline
} from 'ionicons/icons';

addIcons({
  home,
  'person-outline': personOutline,
  'school-outline': schoolOutline,
  'briefcase-outline': briefcaseOutline,
  'chatbubble-outline': chatbubbleOutline,
  'notifications-outline': notificationsOutline,
  'search-outline': searchOutline,
  'document-text-outline': documentTextOutline,
  'locate-outline': locateOutline,
  'arrow-forward-outline': arrowForwardOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'time-outline': timeOutline,
  'ribbon-outline': ribbonOutline,
  'location-outline': locationOutline,
  'accessibility-outline': accessibilityOutline,
  'settings-outline': settingsOutline,
  'save-outline': saveOutline,
  'flag-outline': flagOutline,
  'chatbox-ellipses-outline': chatboxEllipsesOutline,
  'construct-outline': constructOutline,
  'language-outline': languageOutline,
  'add-circle-outline': addCircleOutline,
  'trash-outline': trashOutline,
  'eye-outline': eyeOutline,
  'mail-outline': mailOutline,
  'call-outline': callOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'book-outline': bookOutline
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));