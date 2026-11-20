/** Google Analytics 4 measurement ID (public). GA loads only after the visitor accepts the cookie banner. */
export const GA_ID = "G-JG1BDJ0K15";
/** GA runs only on the live domain, never on previews or localhost. */
export const GA_HOST = "www.frameondrylining.co.uk";
export const CONSENT_KEY = "frameon-consent";
export const OPEN_SETTINGS_EVENT = "frameon:cookie-settings";

export type ConsentText = {
  /** Banner question. */
  text: string;
  accept: string;
  reject: string;
  /** Footer link that reopens the banner. */
  settings: string;
  /** Privacy page: replaces the old "no cookies" line. */
  intro: string;
  /** Privacy page: what Google Analytics does. */
  ga: string;
};

export const CONSENT: Record<string, ConsentText> = {
  en: {
    text: "Can we use analytics cookies? They show us how visitors use the site. No ads, no selling data.",
    accept: "Accept",
    reject: "Reject",
    settings: "Cookie settings",
    intro: "This website uses no advertising trackers. Analytics cookies are set only if you click “Accept” in the cookie banner.",
    ga: "If you accept, Google Analytics (Google Ireland Ltd) counts visits and clicks on the call, WhatsApp, email and quote buttons, using cookies (_ga) that last up to 2 years. You can change your choice at any time with “Cookie settings” at the bottom of every page.",
  },
  uk: {
    text: "Можна використати аналітичні cookies? Вони показують, як відвідувачі користуються сайтом. Без реклами і без продажу даних.",
    accept: "Прийняти",
    reject: "Відхилити",
    settings: "Налаштування cookies",
    intro: "Сайт не використовує рекламні трекери. Аналітичні cookies встановлюються, лише якщо ви натиснете «Прийняти» в банері.",
    ga: "Якщо ви погодитесь, Google Analytics (Google Ireland Ltd) рахує відвідування та натискання кнопок дзвінка, WhatsApp, email і заявки за допомогою cookies (_ga), що зберігаються до 2 років. Змінити вибір можна будь-коли через «Налаштування cookies» внизу кожної сторінки.",
  },
  ru: {
    text: "Можно использовать аналитические cookies? Они показывают, как посетители пользуются сайтом. Без рекламы и без продажи данных.",
    accept: "Принять",
    reject: "Отклонить",
    settings: "Настройки cookies",
    intro: "Сайт не использует рекламные трекеры. Аналитические cookies устанавливаются, только если вы нажмёте «Принять» в баннере.",
    ga: "Если вы согласитесь, Google Analytics (Google Ireland Ltd) считает посещения и нажатия кнопок звонка, WhatsApp, email и заявки с помощью cookies (_ga), которые хранятся до 2 лет. Изменить выбор можно в любой момент через «Настройки cookies» внизу каждой страницы.",
  },
  pl: {
    text: "Czy możemy używać analitycznych plików cookie? Pokazują nam, jak odwiedzający korzystają ze strony. Bez reklam i bez sprzedaży danych.",
    accept: "Akceptuję",
    reject: "Odrzucam",
    settings: "Ustawienia cookies",
    intro: "Ta strona nie używa trackerów reklamowych. Analityczne pliki cookie są zapisywane tylko wtedy, gdy klikniesz „Akceptuję” w banerze.",
    ga: "Jeśli się zgodzisz, Google Analytics (Google Ireland Ltd) liczy wizyty i kliknięcia przycisków połączenia, WhatsApp, e-maila i wyceny, używając plików cookie (_ga) przechowywanych do 2 lat. Swój wybór możesz zmienić w każdej chwili przez „Ustawienia cookies” na dole każdej strony.",
  },
  ro: {
    text: "Putem folosi cookie-uri de analiză? Ne arată cum folosesc vizitatorii site-ul. Fără reclame și fără vânzarea datelor.",
    accept: "Accept",
    reject: "Refuz",
    settings: "Setări cookies",
    intro: "Acest site nu folosește trackere publicitare. Cookie-urile de analiză sunt setate doar dacă apeși „Accept” în banner.",
    ga: "Dacă accepți, Google Analytics (Google Ireland Ltd) numără vizitele și apăsările pe butoanele de apel, WhatsApp, email și cerere de ofertă, folosind cookie-uri (_ga) păstrate până la 2 ani. Îți poți schimba alegerea oricând din „Setări cookies”, jos pe fiecare pagină.",
  },
  es: {
    text: "¿Podemos usar cookies de analítica? Nos muestran cómo usan la web los visitantes. Sin anuncios y sin vender datos.",
    accept: "Aceptar",
    reject: "Rechazar",
    settings: "Ajustes de cookies",
    intro: "Esta web no usa rastreadores publicitarios. Las cookies de analítica solo se activan si pulsas «Aceptar» en el aviso.",
    ga: "Si aceptas, Google Analytics (Google Ireland Ltd) cuenta las visitas y los clics en los botones de llamada, WhatsApp, email y presupuesto, con cookies (_ga) que duran hasta 2 años. Puedes cambiar tu elección cuando quieras en «Ajustes de cookies», al pie de cada página.",
  },
  pt: {
    text: "Podemos usar cookies de análise? Mostram-nos como os visitantes usam o site. Sem anúncios e sem venda de dados.",
    accept: "Aceitar",
    reject: "Recusar",
    settings: "Definições de cookies",
    intro: "Este site não usa rastreadores de publicidade. Os cookies de análise só são ativados se clicar em «Aceitar» no aviso.",
    ga: "Se aceitar, o Google Analytics (Google Ireland Ltd) conta as visitas e os cliques nos botões de chamada, WhatsApp, email e orçamento, com cookies (_ga) que duram até 2 anos. Pode mudar a sua escolha a qualquer momento em «Definições de cookies», no fundo de cada página.",
  },
  it: {
    text: "Possiamo usare cookie di analisi? Ci mostrano come i visitatori usano il sito. Niente pubblicità e nessuna vendita di dati.",
    accept: "Accetto",
    reject: "Rifiuto",
    settings: "Impostazioni cookie",
    intro: "Questo sito non usa tracker pubblicitari. I cookie di analisi vengono impostati solo se clicchi «Accetto» nel banner.",
    ga: "Se accetti, Google Analytics (Google Ireland Ltd) conta le visite e i clic sui pulsanti di chiamata, WhatsApp, email e preventivo, con cookie (_ga) che durano fino a 2 anni. Puoi cambiare scelta in qualsiasi momento da «Impostazioni cookie» in fondo a ogni pagina.",
  },
  ar: {
    text: "هل يمكننا استخدام ملفات تعريف الارتباط التحليلية؟ تُظهر لنا كيف يستخدم الزوار الموقع. بلا إعلانات ولا بيع للبيانات.",
    accept: "قبول",
    reject: "رفض",
    settings: "إعدادات ملفات تعريف الارتباط",
    intro: "لا يستخدم هذا الموقع أدوات تتبع إعلانية. لا تُستخدم ملفات تعريف الارتباط التحليلية إلا إذا ضغطت «قبول» في الشريط.",
    ga: "إذا وافقت، يحسب Google Analytics (Google Ireland Ltd) الزيارات والنقرات على أزرار الاتصال وواتساب والبريد الإلكتروني وطلب السعر، باستخدام ملفات تعريف ارتباط (_ga) تبقى حتى سنتين. يمكنك تغيير اختيارك في أي وقت من «إعدادات ملفات تعريف الارتباط» أسفل كل صفحة.",
  },
  bn: {
    text: "আমরা কি অ্যানালিটিক্স কুকি ব্যবহার করতে পারি? এগুলো দেখায় দর্শকেরা সাইটটি কীভাবে ব্যবহার করেন। কোনো বিজ্ঞাপন নেই, ডেটা বিক্রি নেই।",
    accept: "গ্রহণ করুন",
    reject: "প্রত্যাখ্যান",
    settings: "কুকি সেটিংস",
    intro: "এই সাইটে কোনো বিজ্ঞাপন ট্র্যাকার নেই। ব্যানারে «গ্রহণ করুন» চাপলে তবেই অ্যানালিটিক্স কুকি সেট হয়।",
    ga: "আপনি সম্মতি দিলে Google Analytics (Google Ireland Ltd) ভিজিট এবং কল, WhatsApp, ইমেল ও কোটেশন বোতামে ক্লিক গণনা করে, কুকি (_ga) ব্যবহার করে যা সর্বোচ্চ ২ বছর থাকে। প্রতিটি পেজের নিচে «কুকি সেটিংস» থেকে যেকোনো সময় আপনার পছন্দ বদলাতে পারেন।",
  },
  gu: {
    text: "શું અમે એનાલિટિક્સ કૂકીઝ વાપરી શકીએ? તે બતાવે છે કે મુલાકાતીઓ સાઇટ કેવી રીતે વાપરે છે. કોઈ જાહેરાત નહીં, ડેટાનું વેચાણ નહીં.",
    accept: "સ્વીકારો",
    reject: "નકારો",
    settings: "કૂકી સેટિંગ્સ",
    intro: "આ સાઇટ કોઈ જાહેરાત ટ્રેકર વાપરતી નથી. બેનરમાં «સ્વીકારો» દબાવો ત્યારે જ એનાલિટિક્સ કૂકીઝ સેટ થાય છે.",
    ga: "તમે સંમતિ આપો તો Google Analytics (Google Ireland Ltd) મુલાકાતો અને કૉલ, WhatsApp, ઇમેઇલ અને ક્વોટ બટન પરના ક્લિક ગણે છે, 2 વર્ષ સુધી રહેતી કૂકીઝ (_ga) વડે. દરેક પેજના તળિયે «કૂકી સેટિંગ્સ» થી ગમે ત્યારે તમારી પસંદગી બદલી શકો છો.",
  },
  pa: {
    text: "ਕੀ ਅਸੀਂ ਐਨਾਲਿਟਿਕਸ ਕੂਕੀਜ਼ ਵਰਤ ਸਕਦੇ ਹਾਂ? ਇਹ ਦਿਖਾਉਂਦੀਆਂ ਹਨ ਕਿ ਵਿਜ਼ਟਰ ਸਾਈਟ ਕਿਵੇਂ ਵਰਤਦੇ ਹਨ। ਕੋਈ ਇਸ਼ਤਿਹਾਰ ਨਹੀਂ, ਡਾਟਾ ਦੀ ਵਿਕਰੀ ਨਹੀਂ।",
    accept: "ਸਵੀਕਾਰ ਕਰੋ",
    reject: "ਇਨਕਾਰ ਕਰੋ",
    settings: "ਕੂਕੀ ਸੈਟਿੰਗਾਂ",
    intro: "ਇਹ ਸਾਈਟ ਕੋਈ ਇਸ਼ਤਿਹਾਰੀ ਟਰੈਕਰ ਨਹੀਂ ਵਰਤਦੀ। ਐਨਾਲਿਟਿਕਸ ਕੂਕੀਜ਼ ਸਿਰਫ਼ ਤਾਂ ਲੱਗਦੀਆਂ ਹਨ ਜੇ ਤੁਸੀਂ ਬੈਨਰ ਵਿੱਚ «ਸਵੀਕਾਰ ਕਰੋ» ਦਬਾਓ।",
    ga: "ਜੇ ਤੁਸੀਂ ਸਹਿਮਤ ਹੋ, ਤਾਂ Google Analytics (Google Ireland Ltd) ਵਿਜ਼ਿਟਾਂ ਅਤੇ ਕਾਲ, WhatsApp, ਈਮੇਲ ਅਤੇ ਕੋਟ ਬਟਨਾਂ ਉੱਤੇ ਕਲਿੱਕ ਗਿਣਦਾ ਹੈ, 2 ਸਾਲ ਤੱਕ ਰਹਿਣ ਵਾਲੀਆਂ ਕੂਕੀਜ਼ (_ga) ਨਾਲ। ਹਰ ਪੰਨੇ ਦੇ ਹੇਠਾਂ «ਕੂਕੀ ਸੈਟਿੰਗਾਂ» ਤੋਂ ਤੁਸੀਂ ਕਦੇ ਵੀ ਆਪਣੀ ਚੋਣ ਬਦਲ ਸਕਦੇ ਹੋ।",
  },
};

export const consentText = (locale: string): ConsentText => CONSENT[locale] ?? CONSENT.en;
