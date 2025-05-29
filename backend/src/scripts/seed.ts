// backend/src/scripts/seed.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import Link from '../models/Link';
import Tag from '../models/Tag';

// Load environment variables
dotenv.config();

// Sample data
const sampleUser = {
  username: 'demo_user',
  email: 'demo@example.com',
  password: 'demopassword'
};

const sampleTags = [
  { name: 'Development', color: '#3B82F6' },  // Blue
  { name: 'Design', color: '#EC4899' },       // Pink
  { name: 'Tools', color: '#F59E0B' },        // Amber
  { name: 'Articles', color: '#10B981' },     // Green
  { name: 'Learning', color: '#8B5CF6' },     // Purple
  { name: 'Reference', color: '#64748B' },    // Slate
  { name: 'Inspiration', color: '#EF4444' },  // Red
  { name: 'Productivity', color: '#06B6D4' }  // Cyan
];

const sampleLinks = [
  {
    title: 'GitHub',
    url: 'https://github.com',
    description: 'Where the world builds software',
    tags: ['Development', 'Tools'],
    notes: 'Check trending repositories weekly',
    isFavorite: true
  },
  {
    title: 'Figma',
    url: 'https://figma.com',
    description: 'The collaborative interface design tool',
    tags: ['Design', 'Tools'],
    notes: 'Great for UI mockups',
    isFavorite: true
  },
  {
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Resources for developers, by developers',
    tags: ['Development', 'Learning', 'Reference'],
    notes: 'Reference for JS, CSS, and HTML',
    isFavorite: false
  },
  {
    title: 'Vue.js Documentation',
    url: 'https://vuejs.org/guide/introduction.html',
    description: 'The Progressive JavaScript Framework',
    tags: ['Development', 'Learning'],
    notes: 'Essential guide for Vue development',
    isFavorite: true
  },
  {
    title: 'TailwindCSS',
    url: 'https://tailwindcss.com',
    description: 'A utility-first CSS framework',
    tags: ['Design', 'Development'],
    notes: 'Refer to the utility classes for styling',
    isFavorite: false
  },
  {
    title: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com',
    description: 'For web designers and developers',
    tags: ['Articles', 'Design', 'Development'],
    notes: 'Check monthly for new articles on web dev trends',
    isFavorite: false
  },
  {
    title: 'CSS-Tricks',
    url: 'https://css-tricks.com',
    description: 'Tips, Tricks, and Techniques on using CSS',
    tags: ['Development', 'Design', 'Articles'],
    notes: 'Great resource for CSS solutions',
    isFavorite: true
  },
  {
    title: 'Notion',
    url: 'https://www.notion.so',
    description: 'All-in-one workspace',
    tags: ['Tools', 'Productivity'],
    notes: 'Use for project management and notes',
    isFavorite: false
  },
  {
    title: 'Dribbble',
    url: 'https://dribbble.com',
    description: 'Discover the world's top designers & creatives',
    tags: ['Design', 'Inspiration'],
    notes: 'Look for UI design inspiration',
    isFavorite: false,
    reminderDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },
  {
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: 'Where developers learn, share, & build careers',
    tags: ['Development', 'Reference'],
    notes: 'Search for code solutions',
    isFavorite: true
  },
  {
    title: 'Node.js Documentation',
    url: 'https://nodejs.org/en/docs/',
    description: 'Official Node.js documentation',
    tags: ['Development', 'Reference'],
    notes: 'Reference for Node.js APIs',
    isFavorite: false
  },
  {
    title: 'MongoDB Documentation',
    url: 'https://docs.mongodb.com',
    description: 'Official MongoDB documentation',
    tags: ['Development', 'Reference'],
    notes: 'Reference for MongoDB queries and operations',
    isFavorite: false
  },
  {
    title: 'Express.js',
    url: 'https://expressjs.com',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    tags: ['Development', 'Reference'],
    notes: 'Used for backend development',
    isFavorite: false
  },
  {
    title: 'Trello',
    url: 'https://trello.com',
    description: 'Manage your projects with visual boards',
    tags: ['Tools', 'Productivity'],
    notes: 'Used for personal project management',
    isFavorite: false,
    reminderDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  },
  {
    title: 'Unsplash',
    url: 'https://unsplash.com',
    description: 'Beautiful, free images and photos',
    tags: ['Design', 'Tools'],
    notes: 'Great for finding high-quality free images',
    isFavorite: true
  }
];

// Generate random dates within the last 6 months
function getRandomDate() {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  
  return new Date(
    sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime())
  );
}

// Assign some random created dates to make the data more realistic
function assignRandomDates(links: any[]) {
  return links.map(link => ({
    ...link,
    createdAt: getRandomDate()
  }));
}

// Sort links by createdAt date
function sortLinksByDate(links: any[]) {
  return [...links].sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

// Seed database function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await User.deleteMany({});
    await Link.deleteMany({});
    await Tag.deleteMany({});
    console.log('Cleared existing data');
    
    // Create user
    const hashedPassword = await bcrypt.hash(sampleUser.password, 10);
    const user = await User.create({
      ...sampleUser,
      password: hashedPassword
    });
    console.log('Created demo user');
    
    // Create tags
    const tagDocs = await Promise.all(
      sampleTags.map(tag => 
        Tag.create({
          ...tag,
          userId: user._id
        })
      )
    );
    console.log('Created tags');
    
    // Create tag name to ID mapping
    const tagMap: Record<string, mongoose.Types.ObjectId> = {};
    tagDocs.forEach(tag => {
      tagMap[tag.name] = tag._id;
    });
    
    // Assign random dates and sort links
    const linksWithDates = sortLinksByDate(assignRandomDates(sampleLinks));
    
    // Create links
    await Promise.all(
      linksWithDates.map(link => 
        Link.create({
          ...link,
          userId: user._id,
          tags: link.tags.map((tagName: string) => tagMap[tagName])
        })
      )
    );
    console.log('Created links');
    
    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();