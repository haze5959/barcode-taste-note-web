import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // pathname 변경 감지 시 수동으로 page_view 이벤트 로깅 (React Router 완벽 호환용)
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
