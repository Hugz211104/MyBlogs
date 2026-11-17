import { getCollection, type CollectionEntry } from 'astro:content';

export type CategoryKey = 'tips' | 'builds' | 'tools';

export interface UnifiedPost {
  category: CategoryKey;
  categoryLabel: string;
  slug: string;
  url: string;
  title: string;
  date: Date;
  summary: string;
  cover: string;
  metaLabel: string;
  tags: string[];
  readingMinutes: number;
}

const DEFAULT_COVERS: Record<CategoryKey, string> = {
  tips: '/images/posts/tips-lawbot-fastapi.webp',
  builds: '/images/posts/builds-wwm-sword-spear.webp',
  tools: '/images/posts/tools-sonar-tts.webp',
};

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  tips: 'Tips',
  builds: 'Builds',
  tools: 'Tools',
};

export function formatDateVi(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function estimateReadingMinutes(markdownBody: string): number {
  const plainText = markdownBody
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_\-\[\]()]/g, ' ');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function mapTip(entry: CollectionEntry<'tips'>): UnifiedPost {
  return {
    category: 'tips',
    categoryLabel: CATEGORY_LABELS.tips,
    slug: entry.slug,
    url: `/tips/${entry.slug}`,
    title: entry.data.title,
    date: entry.data.date,
    summary: entry.data.summary,
    cover: entry.data.cover ?? DEFAULT_COVERS.tips,
    metaLabel: entry.data.project,
    tags: entry.data.tags,
    readingMinutes: estimateReadingMinutes(entry.body),
  };
}

function mapBuild(entry: CollectionEntry<'builds'>): UnifiedPost {
  return {
    category: 'builds',
    categoryLabel: CATEGORY_LABELS.builds,
    slug: entry.slug,
    url: `/builds/${entry.slug}`,
    title: entry.data.title,
    date: entry.data.date,
    summary: entry.data.summary,
    cover: entry.data.cover ?? DEFAULT_COVERS.builds,
    metaLabel: entry.data.game,
    tags: entry.data.tags,
    readingMinutes: estimateReadingMinutes(entry.body),
  };
}

function mapTool(entry: CollectionEntry<'tools'>): UnifiedPost {
  return {
    category: 'tools',
    categoryLabel: CATEGORY_LABELS.tools,
    slug: entry.slug,
    url: `/tools/${entry.slug}`,
    title: `${entry.data.title} ${entry.data.version}`,
    date: entry.data.date,
    summary: entry.data.summary,
    cover: entry.data.cover ?? DEFAULT_COVERS.tools,
    metaLabel: entry.data.os.join(', '),
    tags: [...entry.data.tags, ...entry.data.os],
    readingMinutes: estimateReadingMinutes(entry.body),
  };
}

export async function getAllUnifiedPosts(): Promise<UnifiedPost[]> {
  const [tips, builds, tools] = await Promise.all([
    getCollection('tips', ({ data }) => !data.draft),
    getCollection('builds', ({ data }) => !data.draft),
    getCollection('tools', ({ data }) => !data.draft),
  ]);

  const combined: UnifiedPost[] = [
    ...tips.map(mapTip),
    ...builds.map(mapBuild),
    ...tools.map(mapTool),
  ];

  return combined.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getPopularTags(posts: UnifiedPost[], limit = 8): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}
