export interface PlatformLink {
  id: string;
  name: string;
  category: 'video' | 'social' | 'audio' | 'stream' | 'newsletter';
  handle: string;
  url: string;
  followers?: string;
  description?: string;
  active: boolean;
  accentColor?: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  platform: string;
  date: string;
  duration?: string;
  description: string;
  imageUrl: string;
  url: string;
  stats?: string;
  highlightKicker?: string;
}

export interface RecentItem {
  id: string;
  title: string;
  platform: string;
  date: string;
  imageUrl: string;
  url: string;
  format: string;
}

export interface ImportantLinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  badge?: string;
  isPrimary?: boolean;
}

export interface CreatorProfile {
  name: string;
  headlineTitle: string;
  role: string;
  niche: string;
  bioShort: string;
  bioFull: string;
  themes: string[];
  location: string;
  yearsActive: string;
  heroImage: string;
  aboutImage: string;
  primaryEmail: string;
  businessEmail: string;
  platforms: PlatformLink[];
  featuredProjects: FeaturedProject[];
  recentItems: RecentItem[];
  importantLinks: ImportantLinkItem[];
}
