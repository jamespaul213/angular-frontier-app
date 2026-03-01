export default function getUserImage(username: string): string {

  if (!username) return 'assets/avatars/default.png';

  const imageMap: any = {
    'yoda': 'assets/avatars/yoda.png',
    'leiaskywalker': 'assets/avatars/leiaskywalker.png',
    'lukeskywalker': 'assets/avatars/lukeskywalker.png',
    'vader': 'assets/avatars/vader.png'
  };

  return imageMap[username.toLowerCase()] || 'assets/avatars/yoda.png';
}