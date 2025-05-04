const partners = [

    {
        name: '大浦精肉店',
        description: '兵庫県姫路市で40年以上、国産黒毛和牛の美味しさを追求し続ける老舗精肉店。職人の目利きで厳選された和牛を、家庭にも特別な一品としてお届けしています。地元に根ざし、品質と信頼を守り続けてきた名店です。',
        videoUrl: 'https://www.youtube.com/embed/RLxJK5fEtvM?si=2s3z3g-TPFoeVk2S',
        mapUrl: 'https://maps.app.goo.gl/69mSYqCX85jPwzny6'
      },
      
    {
      name: 'グローバルマーケティング株式会社',
      description: 'デジタル広告とSEOに特化したマーケティングパートナー。',
      videoUrl: null
    },

    {
      name: 'クラウドテックジャパン',
      description: 'クラウドインフラの設計・運用を支援するエンジニア集団。',
      videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY'
    },

  ];
  
  const container = document.getElementById('partner-list');
  
  partners.forEach(partner => {
    const card = document.createElement('div');
    card.className = 'partner-card';
  
    let videoEmbed = '';
    if (partner.videoUrl) {
      videoEmbed = `<iframe class="partner-video" src="${partner.videoUrl}" frameborder="0" allowfullscreen></iframe>`;
    }
  
    card.innerHTML = `
  ${videoEmbed}
  <div class="partner-content">
    <div class="partner-name">${partner.name}</div>
    <div class="partner-desc">${partner.description}</div>
    ${partner.mapUrl ? `<p><a href="${partner.mapUrl}" target="_blank" class="map-link">▶ 店舗の場所はこちら</a></p>` : ''}
  </div>
`;

  
    container.appendChild(card);
  });
  
  