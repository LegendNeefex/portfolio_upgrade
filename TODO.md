# TODO - Responsive Tailwind + error fixes

## Responsive updates (mobile/tablet/desktop)
- [ ] banner: make hero responsive (text then image on mobile)
- [ ] aboutMe: switch to 1-column layout on mobile
- [ ] services: hide/scale side watermark images on mobile; make service cards stack
- [ ] getQuote: switch to column layout on mobile; make form full width
- [ ] faq: scale decorative background sizes for mobile
- [ ] verify gallery + project page sections fit within viewport on mobile

## Code correctness checks
- [ ] ensure `setRouteLoading` exists in context consumers
- [ ] ensure loader flags (`loading` and `routeLoading`) are cleared on all fetch paths
- [ ] run `npm run build` and fix any production-only issues

## Validation
- [ ] `npm run dev` and check: mobile/tablet breakpoints, nav, cards grid (3 columns on xl)
- [ ] `npm run lint` (no errors)
- [ ] `npm run build` passes

