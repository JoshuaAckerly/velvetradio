# TODO

## ✅ Completed
- [x] Fix CSS build process for Tailwind integration
- [x] Set up database migrations
- [x] Add tests
- [x] Optimize performance
- [x] Clean up commit history
- [x] Remove temporary deployment fix scripts
- [x] Update comprehensive README documentation
- [x] Create DEPLOYMENT.md with Hypervisor deployment guides
- [x] Update documentation to reflect Linux backend setup
- [x] Security headers middleware (CSP, HSTS, X-Frame-Options, etc.)
- [x] CI/CD pipeline (ci.yml with Node24 + cd.yml auto-deploy on CI success)
- [x] Deploy script: git reset --hard to handle formatter divergence

## 🚀 High Priority
- [N/A] Configure streaming functionality (demo site — audio player sufficient)
- [x] Implement audio player component
- [N/A] Add live streaming integration (demo site — not required)
- [x] Create admin panel for content management

## 📋 Medium Priority
- [x] Implement playlist management system
- [ ] Add user authentication and profiles
- [x] Create schedule/calendar view for shows
- [x] Add search functionality for shows/episodes
- [x] Implement episode archive with filtering

## 🎨 Design & UX
- [x] Enhance responsive design for tablets
- [x] Add animations and transitions (show cards hover lift, hero image zoom, episode card transitions)
- [x] Create custom audio player UI
- [x] Design show/host detail pages
- [x] Add dark mode toggle

## 🔧 Technical Improvements
- [ ] Add API documentation (OpenAPI/Swagger)
- [x] Implement caching strategy for show data
- [x] Add monitoring and error tracking (Sentry — set `SENTRY_LARAVEL_DSN` + `VITE_SENTRY_DSN` in production env)
- [ ] Set up automated backups
- [x] Optimize database queries with indexes (composite index episodes.show_id+published_at; shows active+schedule_day)

## 📱 Future Features
- [N/A] Mobile app (React Native) (out of scope for portfolio site)
- [x] Podcast RSS feed generation (/rss and /rss/{slug} routes; cached 30min)
- [x] Social media integration (SocialShare component on show pages; social links in footer)
- [x] Email notifications for new episodes (EpisodeObserver + EpisodePublished mailable + newsletter_subscribers table)
- [ ] User favorites/bookmarks system
- [ ] Comment system for episodes

## � Automation
- [x] Add Dependabot (`.github/dependabot.yml`) for npm + composer automated dependency PRs

## �🧪 Testing
- [ ] Increase test coverage to 80%+
- [ ] Add frontend testing (Jest/React Testing Library)
- [ ] Implement E2E tests with Playwright
- [ ] Add performance testing

## 📚 Documentation
- [ ] Add inline code documentation
- [ ] Create API documentation
- [ ] Document database schema
- [ ] Create contributing guidelines

---

**Last Updated:** April 23, 2026  
**Project Status:** Active Development
