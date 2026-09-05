import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaArrowRight,
  FaClock,
  FaFacebookF,
  FaFire,
  FaHeart,
  FaInstagram,
  FaLeaf,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaQuoteLeft,
  FaSearchPlus,
  FaStar,
  FaUtensils,
  FaWhatsapp,
} from 'react-icons/fa'
import { Navbar, type Lang } from './components/Navbar'
import { DarkMap } from './components/DarkMap'
import { Lightbox, type LightboxImage } from './components/Lightbox'
import './App.css'

interface MenuItem {
  id: string
  name: string
  category: 'all' | 'shawarma' | 'mezzes' | 'esfihas' | 'doces' | 'bebidas'
  description: string
  tag: string
  image: string
  price?: string
  dietary?: string[]
}

interface ReviewItem {
  id: string
  author: string
  role: string
  rating: number
  comment: string
  source: string
}

export function App() {
  const [lang, setLang] = useState<Lang>('pt')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const t = useMemo(() => {
    return {
      pt: {
        hero: {
          eyebrow: 'Tradição & Gastronomia Síria em São Paulo',
          title: 'ABOUD SÍRIA',
          subtitle: 'Autêntico sabor sírio no coração do Centro Histórico de São Paulo.',
          desc: 'Shawarmas montados na hora no pão folha saj artesanal de fabricação própria, falafel crocante, esfihas aromáticas e doces tradicionais feitos com alma.',
          ctaPrimary: 'Ver Cardápio Completo',
          ctaSecondary: 'Como Chegar',
          ctaWhatsApp: 'Pedir no WhatsApp',
          stat1: '4.7★ no Google',
          stat1Sub: 'Mais de 2.000 avaliações',
          stat2: '100% Artesanal',
          stat2Sub: 'Pão folha assado na hora',
          stat3: 'Tradição Síria',
          stat3Sub: 'Receitas autênticas de família',
        },
        about: {
          tag: 'Nossa História & Tradição',
          title: 'Uma Jornada de Sabores de Damasco a São Paulo',
          p1: 'No movimentado Largo do Paissandú, o Aboud Síria tornou-se um marco da autêntica culinária do Oriente Médio no Centro de São Paulo.',
          p2: 'Trazendo na bagagem as memórias afetivas e os segredos da culinária de sua terra natal, o proprietário Aboud produz diariamente o clássico pão folha (saj) bem atrás do balcão, à vista de todos os clientes.',
          p3: 'Cada tempero, o toque de sumac, a pimenta síria, o creme de alho suave (toum) e a textura dourada da massa folhada dos doces são tratados com o mais rigoroso respeito às tradições sírias.',
          badgeTitle: 'Pão Folha Saj Artesanal',
          badgeDesc: 'Aberto na hora e assado no forno convexo para garantir a textura perfeita do shawarma.',
          feature1Title: 'Espeto Tradicional',
          feature1Desc: 'Carne e frango marinados em especiarias árabes no fogo brando.',
          feature2Title: 'Doces de Fabricação Própria',
          feature2Desc: 'Baklavas folhadas com pistache fresco e flor de laranjeira.',
          feature3Title: 'Hospitalidade Acolhedora',
          feature3Desc: 'O calor humano e a simpatia que acolhem quem visita o centro.',
        },
        menu: {
          tag: 'Gastronomia Síria',
          title: 'Nosso Cardápio Artesanal',
          subtitle: 'Pratos preparados com ingredientes frescos, pão feito na hora e temperos importados.',
          disclaimer: '* Itens verificados do perfil gastronômico da casa. Para confirmar preços do dia e disponibilidade, consulte nosso atendimento via WhatsApp.',
          categories: [
            { id: 'all', label: 'Todos os Pratos' },
            { id: 'shawarma', label: 'Shawarmas & Lanches' },
            { id: 'mezzes', label: 'Pratos & Pastas' },
            { id: 'esfihas', label: 'Esfihas & Salgados' },
            { id: 'doces', label: 'Doces Sírios' },
            { id: 'bebidas', label: 'Bebidas Tradicionais' },
          ],
          orderItem: 'Pedir Este Prato',
        },
        gallery: {
          tag: 'Experiência Visual',
          title: 'A Arte e a Atmosfera da Nossa Cozinha',
          subtitle: 'Do forno saj aos doces artesanais: conheça de perto a essência do Aboud Síria.',
          clickHint: 'Clique nas imagens para expandir em alta resolução',
        },
        reviews: {
          tag: 'Depoimentos Reais',
          title: 'O Que Nossos Clientes Dizem',
          subtitle: 'Mais de 2.000 clientes satisfeitos no Google com nota 4.7★.',
          googleLabel: 'Avaliação no Google Maps',
          scoreText: '4.7 de 5 estrelas',
        },
        visit: {
          tag: 'Visite-nos',
          title: 'Venha Vivenciar o Autêntico Sabor Sírio',
          subtitle: 'Estamos esperando por você no Largo do Paissandú, em frente à Galeria do Rock.',
        },
        ctaBanner: {
          title: 'Deseja saborear o melhor shawarma de São Paulo?',
          desc: 'Faça seu pedido diretamente pelo WhatsApp ou visite nossa loja no Centro Histórico.',
          btnWhatsApp: 'Falar Conosco no WhatsApp',
          btnCall: 'Ligar Agora',
        },
        footer: {
          aboutTitle: 'Aboud Síria',
          aboutText: 'Restaurante e lanchonete de comida síria e árabe autêntica no Centro Histórico de São Paulo. Tradição, sabor e hospitalidade.',
          quickLinks: 'Navegação Rápida',
          contactTitle: 'Atendimento & Pedidos',
          hoursTitle: 'Horário de Funcionamento',
          hoursDays: 'Segunda a Sábado: 09:00 – 20:00',
          hoursSun: 'Domingo: Fechado',
          rights: '© Aboud Síria. Todos os direitos reservados.',
          disclaimer: 'Projeto demonstrativo independente — desenvolvido por AmeerTrc.',
        },
      },
      ar: {
        hero: {
          eyebrow: 'أصالة المطبخ السوري في قلب ساو باولو',
          title: 'ABOUD SÍRIA',
          subtitle: 'نكهة سورية أصيلة في قلب المركز التاريخي لساو باولو.',
          desc: 'شاورما مميزة محضرة في خبز الصاج الطازج المصنوع يدوياً أمامك، فلافل مقرمشة، فطائر ومعجنات دمشقية، وألذ الحلويات السورية الفاخرة.',
          ctaPrimary: 'استعراض القائمة كاملة',
          ctaSecondary: 'كيف تصل إلينا',
          ctaWhatsApp: 'اطلب عبر واتساب',
          stat1: '4.7★ تقييم Google',
          stat1Sub: 'أكثر من 2000 تقييم حقيقي',
          stat2: '100% يدوي وطازج',
          stat2Sub: 'خبز صاج يخبز أمامك فوراً',
          stat3: 'تقاليد سورية أصيلة',
          stat3Sub: 'وصفات عائلية عريقة',
        },
        about: {
          tag: 'تاريخنا وأصالتنا',
          title: 'رحلة النكهات الدمشقية إلى قلب ساو باولو',
          p1: 'في ساحة Largo do Paissandú التاريخية النابضة بالحياة، أصبح مطعم "عبود سوريا" منارة للمأكولات الشرقية الأصيلة في وسط ساو باولو.',
          p2: 'حاملاً معه عبق التراث السوري وذكريات النكهات الشامية، يقوم صاحب المطعم "عبود" بفرد وخبز خبز الصاج الرقيق يومياً خلف طاولة التحضير أمام أعين الزبائن.',
          p3: 'كل بهار، ولمسة السماق، وتتبيلة الشاورما، وكريمة الثومية الناعمة، وطبقات البقلاوة المقرمشة تعكس الشغف الحقيقي والأصالة السورية.',
          badgeTitle: 'خبز الصاج الحرفي الطازج',
          badgeDesc: 'يُفرد في اللحظة ويُخبز على الصاج الدائري الساخن لمنح الشاورما الطراوة والقرمشة المثالية.',
          feature1Title: 'سيخ الشاورما التقليدي',
          feature1Desc: 'لحم ودجاج متبل ببهارات دمشقية عريقة ومشوي على نار هادئة.',
          feature2Title: 'حلويات سورية خاصة',
          feature2Desc: 'بقلاوة ومعمول بالفستق الحلبي وماء الورد من صنعنا.',
          feature3Title: 'كرم الضيافة الشامية',
          feature3Desc: 'دفء الاستقبال والابتسامة التي ترحب بكل زائر لوسط المدينة.',
        },
        menu: {
          tag: 'المأكولات الشامية',
          title: 'قائمة الأطباق الحرفية',
          subtitle: 'أطباق محضرة بمكونات طازجة يومياً، خبز ساخن، وبهارات شرقية أصيلة.',
          disclaimer: '* أصناف معتمدة وموثقة من الهوية الفعلية للمطعم. لتأكيد أسعار اليوم والتوفر، تواصل معنا مباشرة عبر واتساب.',
          categories: [
            { id: 'all', label: 'جميع الأطباق' },
            { id: 'shawarma', label: 'الشاورما والسندويش' },
            { id: 'mezzes', label: 'المقبلات والوجبات' },
            { id: 'esfihas', label: 'الصفيحة والمعجنات' },
            { id: 'doces', label: 'الحلويات السورية' },
            { id: 'bebidas', label: 'المشروبات التقليدية' },
          ],
          orderItem: 'اطلب هذا الطبق',
        },
        gallery: {
          tag: 'تجربة بصرية',
          title: 'فنون المطبخ وأجواء المطعم',
          subtitle: 'من فرن الصاج إلى صواني البقلاوة المذهبة: تعرّف على تفاصيل عبود سوريا.',
          clickHint: 'انقر على أي صورة لتكبيرها بدقة عالية',
        },
        reviews: {
          tag: 'آراء الزبائن',
          title: 'ماذا يقول رواد المطعم؟',
          subtitle: 'أكثر من 2000 زبون راضٍ على Google بتقييم ممتاز 4.7★.',
          googleLabel: 'تقييمات خرائط Google',
          scoreText: '4.7 من أصل 5 نجوم',
        },
        visit: {
          tag: 'تفضل بزيارتنا',
          title: 'عش تجربة النكهة السورية الأصيلة',
          subtitle: 'ننتظرك في Largo do Paissandú، مقابل Galeria do Rock مباشرة.',
        },
        ctaBanner: {
          title: 'هل ترغب في تذوق ألذ شاورما في ساو باولو؟',
          desc: 'اطلب الآن بسهولة عبر واتساب أو تفضل بزيارتنا في المركز التاريخي.',
          btnWhatsApp: 'تواصل معنا عبر واتساب',
          btnCall: 'اتصل بنا الآن',
        },
        footer: {
          aboutTitle: 'أبوود سوريا (Aboud Síria)',
          aboutText: 'مطعم ومأكولات سورية وعربية أصيلة في قلب المركز التاريخي لساو باولو. أصالة، نكهة، وحسن ضيافة.',
          quickLinks: 'روابط سريعة',
          contactTitle: 'الطلبات والاستفسارات',
          hoursTitle: 'أوقات العمل',
          hoursDays: 'من الإثنين إلى السبت: 09:00 ص – 08:00 م',
          hoursSun: 'الأحد: مغلق',
          rights: '© Aboud Síria. جميع الحقوق محفوظة.',
          disclaimer: 'مشروع توضيحي مستقل — تم تطويره بواسطة AmeerTrc.',
        },
      },
      en: {
        hero: {
          eyebrow: 'Authentic Syrian Gastronomy in São Paulo',
          title: 'ABOUD SÍRIA',
          subtitle: 'Authentic Syrian flavor in the heart of São Paulo’s Historic Center.',
          desc: 'Freshly prepared shawarmas made in homemade artisanal saj bread baked live behind the counter, crispy falafel, savory sfihas, and handcrafted Syrian sweets.',
          ctaPrimary: 'View Full Menu',
          ctaSecondary: 'How to Get There',
          ctaWhatsApp: 'Order via WhatsApp',
          stat1: '4.7★ on Google',
          stat1Sub: 'Over 2,000 real reviews',
          stat2: '100% Artisanal',
          stat2Sub: 'Saj bread freshly baked on spot',
          stat3: 'Syrian Tradition',
          stat3Sub: 'Authentic heritage family recipes',
        },
        about: {
          tag: 'Our Heritage & Tradition',
          title: 'A Flavorful Journey from Damascus to São Paulo',
          p1: 'In the vibrant Largo do Paissandú, Aboud Síria has become an authentic landmark of Middle Eastern cuisine in downtown São Paulo.',
          p2: 'Bringing cherished recipes and heritage secrets from his homeland, owner Aboud prepares fresh saj flatbread right behind the counter in full view of customers.',
          p3: 'Every spice blend, sumac touch, Syrian pepper, smooth garlic toum whip, and crisp golden baklava layers honors ancestral Syrian culinary tradition.',
          badgeTitle: 'Handmade Saj Flatbread',
          badgeDesc: 'Stretched live and baked over a hot dome oven for unmatched softness and flavor.',
          feature1Title: 'Traditional Rotisserie Spit',
          feature1Desc: 'Tender beef and chicken marinated in Middle Eastern spices.',
          feature2Title: 'In-House Handcrafted Sweets',
          feature2Desc: 'Phyllo pastry baklava with fresh pistachios and orange blossom.',
          feature3Title: 'Warm Hospitality',
          feature3Desc: 'Heartfelt welcomes and smiles embracing everyone who visits downtown.',
        },
        menu: {
          tag: 'Syrian Culinary Art',
          title: 'Our Artisanal Menu',
          subtitle: 'Dishes prepared daily with fresh ingredients, live-baked bread, and authentic imported spices.',
          disclaimer: '* Verified items reflecting the authentic dining profile. To confirm current day pricing and availability, contact our team on WhatsApp.',
          categories: [
            { id: 'all', label: 'All Dishes' },
            { id: 'shawarma', label: 'Shawarmas & Wraps' },
            { id: 'mezzes', label: 'Platters & Mezzes' },
            { id: 'esfihas', label: 'Sfihas & Pastries' },
            { id: 'doces', label: 'Syrian Sweets' },
            { id: 'bebidas', label: 'Traditional Drinks' },
          ],
          orderItem: 'Order This Dish',
        },
        gallery: {
          tag: 'Visual Experience',
          title: 'The Craft and Atmosphere of Our Kitchen',
          subtitle: 'From the saj oven to golden baklava trays: discover the essence of Aboud Síria.',
          clickHint: 'Click any image to view in high resolution',
        },
        reviews: {
          tag: 'Real Customer Stories',
          title: 'What Our Guests Say',
          subtitle: 'Over 2,000 satisfied guests on Google with a stellar 4.7★ rating.',
          googleLabel: 'Google Maps Reviews',
          scoreText: '4.7 out of 5 stars',
        },
        visit: {
          tag: 'Visit Us',
          title: 'Experience Authentic Syrian Flavor',
          subtitle: 'We look forward to welcoming you at Largo do Paissandú, right in front of Galeria do Rock.',
        },
        ctaBanner: {
          title: 'Ready to taste the best shawarma in São Paulo?',
          desc: 'Place your order directly via WhatsApp or visit our restaurant in the Historic Center.',
          btnWhatsApp: 'Chat with Us on WhatsApp',
          btnCall: 'Call Now',
        },
        footer: {
          aboutTitle: 'Aboud Síria',
          aboutText: 'Authentic Syrian and Arabic restaurant in the Historic Center of São Paulo. Tradition, flavor, and warm hospitality.',
          quickLinks: 'Quick Links',
          contactTitle: 'Orders & Inquiries',
          hoursTitle: 'Opening Hours',
          hoursDays: 'Monday to Saturday: 09:00 AM – 08:00 PM',
          hoursSun: 'Sunday: Closed',
          rights: '© Aboud Síria. All rights reserved.',
          disclaimer: 'Independent demonstrative project — developed by AmeerTrc.',
        },
      },
    }[lang]
  }, [lang])

  const menuItems: MenuItem[] = useMemo(() => {
    if (lang === 'ar') {
      return [
        {
          id: 'sh-misto',
          name: 'شاورما مشكل سوبر (لحم ودجاج)',
          category: 'shawarma',
          tag: 'الأكثر طلباً',
          description: 'شرائح لحم بقري ودجاج مشوي متبل بالبهارات الشامية، ملفوف في خبز الصاج الطازج مع كريم الثومية والمخلل والبطاطس المقرمشة.',
          image: '/images/hero-shawarma.jpg',
          dietary: ['حلال 100%', 'خبز صاج طازج'],
        },
        {
          id: 'sh-plate',
          name: 'صحن شاورما عربي دمشقي',
          category: 'shawarma',
          tag: 'طبق عربي فاخر',
          description: 'قطع شاورما مقطعة رولات في خبز الصاج، تُقدم مع صحن بطاطس مبهرة، مخللات لفت وخيار سوري، وصوص ثومية وطحينة.',
          image: '/images/dish-shawarma.jpg',
          dietary: ['حلال 100%', 'وجبة متكاملة'],
        },
        {
          id: 'falafel-sp',
          name: 'فلافل شامية مقرمشة مع صوص الطراطور',
          category: 'mezzes',
          tag: 'نباتي مميز',
          description: 'أقراص فلافل مقلية ذهبية غنية بالأعشاب والكمون وبذور السمسم، تُقدم مع صوص الطحينة (الطراطور) والسماق والنعناع.',
          image: '/images/dish-falafel.jpg',
          dietary: ['نباتي 100%', 'خالٍ من المشتقات الحيوانية'],
        },
        {
          id: 'kibe-trad',
          name: 'كبة مقلية محشوة باللحم والمكسرات',
          category: 'esfihas',
          tag: 'تراثي كلاسيكي',
          description: 'غلاف مقرمش من البرغل واللحم الناعم محشو باللحم المفروم المتبل والصنوبر والبصل المحمص، يُقدم ساخناً مع الليمون.',
          image: '/images/dish-kibe.jpg',
          dietary: ['حلال', 'وصفة دمشقية'],
        },
        {
          id: 'esfihas-mix',
          name: 'صفيحة شامية وفطائر جبنة وزعتر',
          category: 'esfihas',
          tag: 'طازجة من الفرن',
          description: 'فطائر مفتوحة ومخبوزة باللحم المفروم المتبل مع الطماطم والصنوبر، وفطائر الجبن الشامي العكاوي والزعتر البلدي بزيت الزيتون.',
          image: '/images/dish-esfiha.jpg',
          dietary: ['خبز طازج', 'حلال'],
        },
        {
          id: 'pastas-trio',
          name: 'ثلاثي المقبلات السورية (حمص، متبل، لبنة)',
          category: 'mezzes',
          tag: 'مقبلات باردة',
          description: 'حمص ناعم بزيت الزيتون البكر، متبل باذنجان مشوي بحبوب الرمان، ولبنة مكبوسة مع النعناع والزعتر والخبز الساخن.',
          image: '/images/dish-pastas.jpg',
          dietary: ['نباتي', 'زيت زيتون بكر'],
        },
        {
          id: 'baklava-pist',
          name: 'تشكيلة بقلاوة وحلويات سورية بالفستق الحلبي',
          category: 'doces',
          tag: 'صنع يدوي في المطعم',
          description: 'رقائق عجين البقلاوة الهشة والمورقة محشوة بالفستق الحلبي الفاخر ومسقية بقطر ماء الزهر والسمن البلدي.',
          image: '/images/dish-baklava.jpg',
          dietary: ['حلويات دمشقية', 'فستق حلبي طبيعي'],
        },
        {
          id: 'drinks-tea',
          name: 'شاي سوري بالنعناع وقرفة وكافيه بالهيل',
          category: 'bebidas',
          tag: 'مشروب تقليدي',
          description: 'شاي أسود معتق بأوراق النعناع الطازج والقرفة، وقهوة عربية بالهيل محضرة في ركوة النحاس التقليدية.',
          image: '/images/gallery-tea.jpg',
          dietary: ['أصلي وطازج', 'بهارات دمشقية'],
        },
      ]
    }

    if (lang === 'en') {
      return [
        {
          id: 'sh-misto',
          name: 'Super Mixed Shawarma (Beef & Chicken)',
          category: 'shawarma',
          tag: 'Best Seller',
          description: 'Thin ribbons of spit-roasted spiced beef and chicken wrapped in fresh housemade saj flatbread with creamy toum garlic sauce, pickles, and crispy fries.',
          image: '/images/hero-shawarma.jpg',
          dietary: ['100% Halal', 'Fresh Saj Bread'],
        },
        {
          id: 'sh-plate',
          name: 'Damascus Arabic Shawarma Platter',
          category: 'shawarma',
          tag: 'Chef Special',
          description: 'Bite-sized sliced saj shawarma rolls served on a platter with spiced golden fries, wild pickled turnips and cucumbers, creamy garlic dip and tahini.',
          image: '/images/dish-shawarma.jpg',
          dietary: ['100% Halal', 'Complete Meal'],
        },
        {
          id: 'falafel-sp',
          name: 'Crispy Syrian Falafel with Tarator Sauce',
          category: 'mezzes',
          tag: 'Top Vegetarian',
          description: 'Golden-fried chickpea patties packed with fresh herbs and spices, coated in toasted sesame seeds, served with tahini sauce, sumac, and fresh mint.',
          image: '/images/dish-falafel.jpg',
          dietary: ['100% Vegetarian', 'Vegan Friendly'],
        },
        {
          id: 'kibe-trad',
          name: 'Traditional Stuffed Fried Kibbeh',
          category: 'esfihas',
          tag: 'Heritage Classic',
          description: 'Crisp bulgur wheat crust stuffed with seasoned ground beef, roasted onions, and toasted pine nuts, served hot with fresh lemon and garlic sauce.',
          image: '/images/dish-kibe.jpg',
          dietary: ['100% Halal', 'Family Recipe'],
        },
        {
          id: 'esfihas-mix',
          name: 'Open Syrian Sfihas (Meat, Cheese & Zaatar)',
          category: 'esfihas',
          tag: 'Oven Fresh',
          description: 'Freshly baked open pies topped with seasoned spiced minced meat, Syrian melted Akkawi cheese, and aromatic wild zaatar with extra virgin olive oil.',
          image: '/images/dish-esfiha.jpg',
          dietary: ['Fresh Dough', 'Halal'],
        },
        {
          id: 'pastas-trio',
          name: 'Syrian Mezze Trio (Hummus, Babaganoush & Labneh)',
          category: 'mezzes',
          tag: 'Cold Mezze',
          description: 'Silky smooth hummus with chickpeas and olive oil, smoky roasted eggplant babaganoush with pomegranate, and artisanal labneh with fresh mint and warm pita.',
          image: '/images/dish-pastas.jpg',
          dietary: ['Vegetarian', 'Extra Virgin Olive Oil'],
        },
        {
          id: 'baklava-pist',
          name: 'Syrian Artisanal Baklava with Pistachios',
          category: 'doces',
          tag: 'In-House Baked',
          description: 'Golden crispy phyllo pastry layers brimming with emerald green pistachios and walnuts, glistening with orange blossom syrup.',
          image: '/images/dish-baklava.jpg',
          dietary: ['Handcrafted', 'Pure Pistachio'],
        },
        {
          id: 'drinks-tea',
          name: 'Syrian Mint Tea & Cardamom Arabic Coffee',
          category: 'bebidas',
          tag: 'Traditional Brew',
          description: 'Spiced black tea with fresh mint leaves and cinnamon, paired with Arabic cardamom coffee brewed in an authentic copper cezve.',
          image: '/images/gallery-tea.jpg',
          dietary: ['Freshly Brewed', 'Authentic Aroma'],
        },
      ]
    }

    // Portuguese default
    return [
      {
        id: 'sh-misto',
        name: 'Shawarma Misto Super (Carne e Frango)',
        category: 'shawarma',
        tag: 'Mais Pedido',
        description: 'Fatias nobres de carne bovina e frango marinadas em 7 especiarias sírias, enroladas no pão folha artesanal assado na hora, com pasta de alho (toum), picles e batata frita.',
        image: '/images/hero-shawarma.jpg',
        dietary: ['100% Halal', 'Pão Folha Artesanal'],
      },
      {
        id: 'sh-plate',
        name: 'Prato Árabe Especial de Shawarma',
        category: 'shawarma',
        tag: 'Especial da Casa',
        description: 'Shawarma fatiado em rolinhos aperitivo no pão folha, acompanhado de porção generosa de batatas fritas temperadas, picles sírios, creme de alho suave e tahine.',
        image: '/images/dish-shawarma.jpg',
        dietary: ['100% Halal', 'Refeição Completa'],
      },
      {
        id: 'falafel-sp',
        name: 'Falafel Artesanal Crocante com Molho Tarator',
        category: 'mezzes',
        tag: 'Destaque Vegano',
        description: 'Bolinhos dourados e crocantes de grão-de-bico com ervas frescas, coentro, cominho e gergelim, servidos com molho de tahine (tarator), sumac e hortelã fresca.',
        image: '/images/dish-falafel.jpg',
        dietary: ['100% Vegetariano', 'Vegano'],
      },
      {
        id: 'kibe-trad',
        name: 'Kibe Frito Tradicional Recheado',
        category: 'esfihas',
        tag: 'Clássico Árabe',
        description: 'Casca crocante de trigo para quibe e carne bovina nobre, recheada com carne moída bem temperada, cebolas douradas e nozes/pinoli. Servido com limão e toum.',
        image: '/images/dish-kibe.jpg',
        dietary: ['100% Halal', 'Receita Tradicional'],
      },
      {
        id: 'esfihas-mix',
        name: 'Esfihas Abertas Sírias (Carne, Queijo e Zaatar)',
        category: 'esfihas',
        tag: 'Assadas na Hora',
        description: 'Massa leve e fofinha aberta à mão com recheio de carne bovina temperada à moda de Damasco, queijo sírio derretido e zaatar autêntico com azeite extravirgem.',
        image: '/images/dish-esfiha.jpg',
        dietary: ['Massa Fresca', '100% Halal'],
      },
      {
        id: 'pastas-trio',
        name: 'Trio de Pastas Sírias (Homus, Babaganoush e Coalhada)',
        category: 'mezzes',
        tag: 'Mezze Tradicional',
        description: 'Homus aveludado com grão-de-bico e azeite extravirgem, babaganoush defumado com romã, e coalhada seca artesanal com zaatar e hortelã. Acompanha pão sírio quentinho.',
        image: '/images/dish-pastas.jpg',
        dietary: ['Vegetariano', 'Azeite Extravirgem'],
      },
      {
        id: 'baklava-pist',
        name: 'Bandeja de Baklavas e Doces Sírios com Pistache',
        category: 'doces',
        tag: 'Fabricação Própria',
        description: 'Massa folhada translúcida e ultracrocante recheada com pistache fresco e nozes, regada com calda artesanal de flor de laranjeira e mel. Uma joia da confeitaria árabe.',
        image: '/images/dish-baklava.jpg',
        dietary: ['Feito na Casa', 'Pistache Puro'],
      },
      {
        id: 'drinks-tea',
        name: 'Chá Sírio com Hortelã e Café Árabe com Cardamomo',
        category: 'bebidas',
        tag: 'Tradição Oriental',
        description: 'Chá preto com especiarias e folhas frescas de hortelã, e café árabe aromático com cardamomo fervido na tradicional cezve de cobre.',
        image: '/images/gallery-tea.jpg',
        dietary: ['Feito na Hora', 'Aroma Único'],
      },
    ]
  }, [lang])

  const filteredMenuItems = useMemo(() => {
    if (activeCategory === 'all') return menuItems
    return menuItems.filter((item) => item.category === activeCategory)
  }, [menuItems, activeCategory])

  const galleryList: LightboxImage[] = useMemo(() => {
    return [
      {
        src: '/images/hero-shawarma.jpg',
        title: lang === 'ar' ? 'شاورما سورية مميزة في خبز الصاج' : lang === 'en' ? 'Gourmet Syrian Shawarma in Saj Bread' : 'Shawarma Sírio Especial no Pão Folha',
        subtitle: lang === 'ar' ? 'لحم مشوي متبل مع صلصة الثومية والمخللات' : lang === 'en' ? 'Spit-roasted meat with garlic toum and Syrian pickles' : 'Carnes marinadas no espeto com pasta de alho e picles artesanais',
        tag: 'Shawarma',
      },
      {
        src: '/images/dish-falafel.jpg',
        title: lang === 'ar' ? 'فلافل شامية مقرمشة بالأعشاب' : lang === 'en' ? 'Crispy Golden Syrian Falafel' : 'Falafel Dourado e Crocante',
        subtitle: lang === 'ar' ? 'فلافل طازجة مع صوص الطحينة وبذور السمسم' : lang === 'en' ? 'Freshly fried chickpea patties with sesame tahini dip' : 'Grão-de-bico com ervas frescas e molho de gergelim',
        tag: 'Falafel',
      },
      {
        src: '/images/gallery-saj.jpg',
        title: lang === 'ar' ? 'فرد وخبز الصاج الطازج يومياً' : lang === 'en' ? 'Live Handcrafted Saj Bread Baking' : 'Preparo Artesanal do Pão Folha no Saj',
        subtitle: lang === 'ar' ? 'يتم خبز الصاج خلف الطاولة أمام أعين الزبائن' : lang === 'en' ? 'Hand-stretched dough baked over a hot domed saj oven' : 'Massa aberta na hora e assada no forno tradicional à vista de todos',
        tag: 'Pão Folha',
      },
      {
        src: '/images/gallery-spit.jpg',
        title: lang === 'ar' ? 'سيخ الشاورما الدوار على النار الهادئة' : lang === 'en' ? 'Rotating Shawarma Rotisserie Spit' : 'O Espeto Tradicional de Shawarma',
        subtitle: lang === 'ar' ? 'لحوم متبلة بسبع بهارات دمشقية تشوى ببطء' : lang === 'en' ? 'Slowly roasted meats seasoned with authentic Damascus spices' : 'Carnes suculentas grelhadas lentamente com especiarias sírias',
        tag: 'Tradição',
      },
      {
        src: '/images/dish-baklava.jpg',
        title: lang === 'ar' ? 'صواني البقلاوة والحلويات السورية الفاخرة' : lang === 'en' ? 'Artisanal Pistachio Baklava Trays' : 'Doces Sírios e Baklavas com Pistache',
        subtitle: lang === 'ar' ? 'حلويات مصنوعة يدوياً بالفستق الحلبي وماء الورد' : lang === 'en' ? 'Handmade layered pastry with pure pistachios and blossom syrup' : 'Fabricação própria com massa folhada e pistache selecionado',
        tag: 'Doces',
      },
      {
        src: '/images/gallery-tea.jpg',
        title: lang === 'ar' ? 'الشاي الشامي والقهوة بالهيل' : lang === 'en' ? 'Syrian Mint Tea & Cardamom Coffee' : 'Chá Sírio com Hortelã e Café com Cardamomo',
        subtitle: lang === 'ar' ? 'ضيافة دمشقية دافئة تعطر الأجواء' : lang === 'en' ? 'Warm Middle Eastern hospitality served with aromatic spices' : 'Hospitalidade oriental com especiarias e ervas frescas',
        tag: 'Bebidas',
      },
    ]
  }, [lang])

  const reviewsList: ReviewItem[] = useMemo(() => {
    if (lang === 'ar') {
      return [
        {
          id: '1',
          author: 'ماركوس سيلفا',
          role: 'مرشد محلي على Google',
          rating: 5,
          comment: 'أفضل شاورما تناولتها في ساو باولو بلا منازع! خبز الصاج يُصنع طازجاً أمامك، واللحم طري ومتبل بإتقان، وصاحب المطعم ودود للغاية وذو ابتسامة مرحبة.',
          source: 'Google Reviews',
        },
        {
          id: '2',
          author: 'بياتريس أوليفيرا',
          role: 'عاشقة للطعام الشرقي',
          rating: 5,
          comment: 'البقلاوة والحلويات السورية قمة في الروعة! كل شيء مصنوع بحرفية وجودة عالية. تجربة مبهجة في وسط ساو باولو بجوار Galeria do Rock.',
          source: 'Google Reviews',
        },
        {
          id: '3',
          author: 'لياندرو فرنانديز',
          role: 'زبون دائم',
          rating: 5,
          comment: 'الفلافل هنا مقرمشة بشكل لا يصدق وطازجة جداً، والشاورما المكس محشوة بكرم. سعر ممتاز مقابل جودة ونظافة استثنائية.',
          source: 'Google Reviews',
        },
      ]
    }

    if (lang === 'en') {
      return [
        {
          id: '1',
          author: 'Marcos Silva',
          role: 'Google Local Guide',
          rating: 5,
          comment: 'Hands down the most authentic shawarma in São Paulo! The freshly made saj flatbread baked in front of you elevates the sandwich to a whole new level.',
          source: 'Google Reviews',
        },
        {
          id: '2',
          author: 'Beatriz Oliveira',
          role: 'Food Enthusiast',
          rating: 5,
          comment: 'The handmade baklavas and Syrian sweets are out of this world! Pure pistachio, crisp layers, and generous hospitality from owner Aboud.',
          source: 'Google Reviews',
        },
        {
          id: '3',
          author: 'Leandro Fernandes',
          role: 'Regular Customer',
          rating: 5,
          comment: 'Crispy falafel, juicy meat, fragrant spices, and fast friendly service right across from Galeria do Rock. Unbeatable authenticity and quality.',
          source: 'Google Reviews',
        },
      ]
    }

    return [
      {
        id: '1',
        author: 'Marcos Silva',
        role: 'Guia Local no Google',
        rating: 5,
        comment: 'Com certeza o melhor shawarma de São Paulo! O pão folha feito na hora atrás do balcão faz toda a diferença. A carne é super suculenta e o atendimento do Aboud é nota 10.',
        source: 'Google Reviews',
      },
      {
        id: '2',
        author: 'Beatriz Oliveira',
        role: 'Crítica Gastronômica & Cliente',
        rating: 5,
        comment: 'Os doces sírios de fabricação própria são espetaculares! A baklava de pistache tem uma massa levíssima e crocante. Um pedaço de Damasco no centro de SP.',
        source: 'Google Reviews',
      },
      {
        id: '3',
        author: 'Leandro Fernandes',
        role: 'Cliente Frequente',
        rating: 5,
        comment: 'Falafel crocante por fora e verdinho por dentro, shawarma caprichado e preço justo. Fica bem em frente à Galeria do Rock. Vale cada visita!',
        source: 'Google Reviews',
      },
    ]
  }, [lang])

  return (
    <div className="page-shell">
      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'Aboud Síria',
            image: 'https://aboudsiria.com.br/images/hero-shawarma.jpg',
            description:
              'Restaurante e lanchonete síria autêntica no Centro Histórico de São Paulo. Shawarma no pão folha saj artesanal, falafel, esfihas e doces sírios.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Largo do Paissandú, 55',
              addressLocality: 'São Paulo',
              addressRegion: 'SP',
              postalCode: '01034-010',
              addressCountry: 'BR',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: -23.5427429,
              longitude: -46.6385625,
            },
            telephone: '+55-11-95842-1962',
            servesCuisine: ['Síria', 'Árabe', 'Middle Eastern', 'Halal'],
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '20:00',
              },
            ],
            priceRange: '$$',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.7',
              reviewCount: '2150',
            },
            sameAs: [
              'https://www.instagram.com/aboudsiria/',
              'https://www.facebook.com/aboud.siria/',
            ],
          }),
        }}
      />

      {/* Top Navigation */}
      <Navbar lang={lang} onLangChange={setLang} />

      {/* Hero Section */}
      <section id="home" className="hero-fullscreen">
        <div className="hero-background-art">
          <img
            src="/images/hero-shawarma.jpg"
            alt="Authentic gourmet Syrian Shawarma platter at Aboud Siria"
            className="hero-bg-image"
          />
          <div className="hero-gradient-overlay" />
          <div className="hero-glow-particles" />
        </div>

        <div className="hero-container">
          <motion.div
            className="hero-content-block"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero-tag-badge">
              <span className="gold-sparkle">✨</span>
              <span>{t.hero.eyebrow}</span>
            </div>

            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-lead-subtitle">{t.hero.subtitle}</p>
            <p className="hero-description-text">{t.hero.desc}</p>

            <div className="hero-actions-row">
              <a href="#menu" className="btn-gold-glow primary-action">
                <FaUtensils className="btn-icon" />
                <span>{t.hero.ctaPrimary}</span>
                <FaArrowRight className="btn-arrow" />
              </a>

              <a href="#location" className="btn-glass-subtle secondary-action">
                <FaMapMarkerAlt className="btn-icon text-gold" />
                <span>{t.hero.ctaSecondary}</span>
              </a>

              <a
                href="https://wa.me/5511958421962?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Aboud%20S%C3%ADria."
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp-outline tertiary-action"
              >
                <FaWhatsapp className="btn-icon text-green" />
                <span>{t.hero.ctaWhatsApp}</span>
              </a>
            </div>

            {/* Verified Highlights Bar */}
            <div className="hero-stats-band">
              <div className="stat-card">
                <div className="stat-icon-wrap">
                  <FaStar className="stat-star-icon" />
                </div>
                <div className="stat-text-info">
                  <strong>{t.hero.stat1}</strong>
                  <small>{t.hero.stat1Sub}</small>
                </div>
              </div>

              <div className="stat-divider" />

              <div className="stat-card">
                <div className="stat-icon-wrap">
                  <FaFire className="stat-fire-icon" />
                </div>
                <div className="stat-text-info">
                  <strong>{t.hero.stat2}</strong>
                  <small>{t.hero.stat2Sub}</small>
                </div>
              </div>

              <div className="stat-divider" />

              <div className="stat-card">
                <div className="stat-icon-wrap">
                  <FaHeart className="stat-heart-icon" />
                </div>
                <div className="stat-text-info">
                  <strong>{t.hero.stat3}</strong>
                  <small>{t.hero.stat3Sub}</small>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story / About Section */}
      <section id="story" className="section-padded story-section-full">
        <div className="section-container">
          <div className="story-split-grid">
            <motion.div
              className="story-visual-column"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className="story-image-showcase">
                <img
                  src="/images/gallery-saj.jpg"
                  alt="Preparo do pão folha artesanal no forno saj"
                  className="story-main-img"
                  loading="lazy"
                />
                <div className="story-floating-badge">
                  <div className="badge-glow-ring" />
                  <div className="badge-inner">
                    <span className="badge-flag">🇸🇾</span>
                    <div>
                      <strong>{t.about.badgeTitle}</strong>
                      <small>{t.about.badgeDesc}</small>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="story-text-column"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className="section-tag-gold">
                <span>{t.about.tag}</span>
              </div>
              <h2 className="section-title-large">{t.about.title}</h2>

              <p className="story-paragraph highlight">{t.about.p1}</p>
              <p className="story-paragraph">{t.about.p2}</p>
              <p className="story-paragraph">{t.about.p3}</p>

              <div className="story-features-list">
                <div className="feature-item">
                  <div className="feature-icon-box">
                    <FaFire />
                  </div>
                  <div>
                    <h4>{t.about.feature1Title}</h4>
                    <p>{t.about.feature1Desc}</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-box">
                    <FaUtensils />
                  </div>
                  <div>
                    <h4>{t.about.feature2Title}</h4>
                    <p>{t.about.feature2Desc}</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-box">
                    <FaHeart />
                  </div>
                  <div>
                    <h4>{t.about.feature3Title}</h4>
                    <p>{t.about.feature3Desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu / Cardápio Section */}
      <section id="menu" className="section-padded menu-section-full">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-tag-gold">{t.menu.tag}</span>
            <h2 className="section-title-large">{t.menu.title}</h2>
            <p className="section-subtitle-text">{t.menu.subtitle}</p>
          </div>

          {/* Category Filter Pills */}
          <div className="menu-categories-tabs" role="tablist" aria-label="Menu categories">
            {t.menu.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`menu-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                role="tab"
                aria-selected={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="menu-cards-grid">
            <AnimatePresence mode="popLayout">
              {filteredMenuItems.map((item, idx) => (
                <motion.article
                  key={item.id}
                  className="dish-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  layout
                >
                  <div className="dish-image-wrapper">
                    <img src={item.image} alt={item.name} loading="lazy" className="dish-img" />
                    <div className="dish-tag-badge">{item.tag}</div>
                  </div>

                  <div className="dish-body-content">
                    <div className="dish-header-row">
                      <h3 className="dish-name">{item.name}</h3>
                    </div>

                    <p className="dish-desc">{item.description}</p>

                    {item.dietary && (
                      <div className="dish-dietary-pills">
                        {item.dietary.map((d) => (
                          <span key={d} className="dietary-pill">
                            <FaLeaf className="leaf-icon" /> {d}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="dish-card-footer">
                      <a
                        href={`https://wa.me/5511958421962?text=Ol%C3%A1!%20Gostaria%20de%20pedir:%20${encodeURIComponent(
                          item.name
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="dish-order-link"
                      >
                        <FaWhatsapp />
                        <span>{t.menu.orderItem}</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <div className="menu-disclaimer-box">
            <p>{t.menu.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* Gallery Section with Lightbox */}
      <section id="gallery" className="section-padded gallery-section-full">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-tag-gold">{t.gallery.tag}</span>
            <h2 className="section-title-large">{t.gallery.title}</h2>
            <p className="section-subtitle-text">{t.gallery.subtitle}</p>
            <span className="gallery-hint-badge">
              <FaSearchPlus /> {t.gallery.clickHint}
            </span>
          </div>

          <div className="gallery-masonry-grid">
            {galleryList.map((item, index) => (
              <motion.div
                key={item.src}
                className={`gallery-card-item item-${index}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setLightboxIndex(index)}
                tabIndex={0}
                role="button"
                aria-label={`Expand photo: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setLightboxIndex(index)
                  }
                }}
              >
                <img src={item.src} alt={item.title} loading="lazy" className="gallery-img" />
                <div className="gallery-card-overlay">
                  <div className="overlay-tag">{item.tag}</div>
                  <h4 className="overlay-title">{item.title}</h4>
                  <p className="overlay-desc">{item.subtitle}</p>
                  <div className="overlay-zoom-icon">
                    <FaSearchPlus />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Component */}
      <Lightbox
        images={galleryList}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() =>
          setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryList.length : null))
        }
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + galleryList.length) % galleryList.length : null
          )
        }
      />

      {/* Reviews & Social Proof Section */}
      <section id="reviews" className="section-padded reviews-section-full">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-tag-gold">{t.reviews.tag}</span>
            <h2 className="section-title-large">{t.reviews.title}</h2>
            <p className="section-subtitle-text">{t.reviews.subtitle}</p>

            <div className="google-rating-featured-badge">
              <div className="google-g-logo">G</div>
              <div className="badge-stars-group">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <strong>{t.reviews.scoreText}</strong>
              </div>
              <span className="rating-source-text">{t.reviews.googleLabel}</span>
            </div>
          </div>

          <div className="reviews-cards-grid">
            {reviewsList.map((rev, index) => (
              <motion.div
                key={rev.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="quote-mark-icon">
                  <FaQuoteLeft className="quote-mark" />
                </div>
                <div className="stars-row card-stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-comment">"{rev.comment}"</p>
                <div className="testimonial-author-meta">
                  <strong>{rev.author}</strong>
                  <small>{rev.role}</small>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Map & Location Section */}
      <section id="location" className="section-padded location-section-full">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-tag-gold">{t.visit.tag}</span>
            <h2 className="section-title-large">{t.visit.title}</h2>
            <p className="section-subtitle-text">{t.visit.subtitle}</p>
          </div>

          {/* Interactive Leaflet Dark Map */}
          <DarkMap lang={lang} />
        </div>
      </section>

      {/* CTA Conversion Banner */}
      <section className="cta-banner-section">
        <div className="section-container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h2>{t.ctaBanner.title}</h2>
              <p>{t.ctaBanner.desc}</p>
            </div>
            <div className="cta-banner-buttons">
              <a
                href="https://wa.me/5511958421962?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Aboud%20S%C3%ADria."
                target="_blank"
                rel="noreferrer"
                className="btn-banner-primary"
              >
                <FaWhatsapp className="btn-icon" />
                <span>{t.ctaBanner.btnWhatsApp}</span>
              </a>
              <a href="tel:+5511958421962" className="btn-banner-secondary">
                <FaPhoneAlt className="btn-icon" />
                <span>{t.ctaBanner.btnCall}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Hours Section */}
      <section id="contact" className="section-padded contact-section-full">
        <div className="section-container">
          <div className="contact-cards-grid">
            <div className="contact-info-card">
              <div className="card-icon-header">
                <FaMapMarkerAlt />
              </div>
              <h4>Lg. do Paissandú, 55</h4>
              <p>Centro Histórico, São Paulo - SP, 01034-010</p>
              <small>Em frente à Galeria do Rock • Metrô São Bento e República</small>
            </div>

            <div className="contact-info-card">
              <div className="card-icon-header">
                <FaClock />
              </div>
              <h4>{t.footer.hoursTitle}</h4>
              <p className="highlight-gold">{t.footer.hoursDays}</p>
              <small>{t.footer.hoursSun}</small>
            </div>

            <div className="contact-info-card">
              <div className="card-icon-header">
                <FaPhoneAlt />
              </div>
              <h4>(11) 95842-1962</h4>
              <p>Atendimento direto e pedidos via WhatsApp</p>
              <a
                href="https://wa.me/5511958421962"
                target="_blank"
                rel="noreferrer"
                className="card-action-link"
              >
                <FaWhatsapp /> Iniciar conversa no WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer-premium">
        <div className="section-container">
          <div className="footer-top-grid">
            <div className="footer-brand-col">
              <div className="footer-brand-header">
                <div className="brand-badge-emblem">
                  <span className="brand-letters">AS</span>
                  <span className="brand-syria-pill">🇸🇾</span>
                </div>
                <span className="footer-brand-title">ABOUD SÍRIA</span>
              </div>
              <p className="footer-brand-desc">{t.footer.aboutText}</p>
              <div className="footer-social-links">
                <a
                  href="https://www.instagram.com/aboudsiria/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram @aboudsiria"
                  className="social-circle-btn"
                  title="Instagram @aboudsiria"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/aboud.siria/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook Aboud Síria"
                  className="social-circle-btn"
                  title="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://wa.me/5511958421962"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="social-circle-btn"
                  title="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            <div className="footer-links-col">
              <h4>{t.footer.quickLinks}</h4>
              <ul>
                <li><a href="#home">{lang === 'ar' ? 'الرئيسية' : lang === 'en' ? 'Home' : 'Início'}</a></li>
                <li><a href="#menu">{lang === 'ar' ? 'القائمة' : lang === 'en' ? 'Menu' : 'Cardápio'}</a></li>
                <li><a href="#story">{lang === 'ar' ? 'أصالتنا' : lang === 'en' ? 'Tradition' : 'Nossa Tradição'}</a></li>
                <li><a href="#gallery">{lang === 'ar' ? 'المعرض' : lang === 'en' ? 'Gallery' : 'Galeria'}</a></li>
                <li><a href="#location">{lang === 'ar' ? 'الموقع' : lang === 'en' ? 'Location' : 'Localização'}</a></li>
              </ul>
            </div>

            <div className="footer-contact-col">
              <h4>{t.footer.contactTitle}</h4>
              <p>Largo do Paissandú, 55 - Centro Histórico</p>
              <p>São Paulo - SP, CEP 01034-010</p>
              <p className="contact-highlight">Tel / WhatsApp: (11) 95842-1962</p>
              <p className="contact-hours">{t.footer.hoursDays}</p>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p className="footer-rights">{t.footer.rights}</p>
            <p className="footer-disclaimer-highlight">{t.footer.disclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
