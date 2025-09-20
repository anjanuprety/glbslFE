/**
 * Validation utility to check for common issues in the application
 */

/**
 * Validates that all required translation keys exist
 */
export const validateTranslations = (translations: Record<string, any>, requiredKeys: string[]) => {
  const issues: string[] = [];
  
  requiredKeys.forEach(key => {
    if (!translations[key]) {
      issues.push(`Missing translation key: ${key}`);
    } else {
      if (!translations[key].en) {
        issues.push(`Missing English translation for key: ${key}`);
      }
      if (!translations[key].ne) {
        issues.push(`Missing Nepali translation for key: ${key}`);
      }
    }
  });
  
  return issues;
};

/**
 * Validates that images have proper alt attributes
 */
export const validateImageAccessibility = (htmlContent: string) => {
  const issues: string[] = [];
  const imgRegex = /<img[^>]*>/g;
  const matches = htmlContent.match(imgRegex) || [];
  
  matches.forEach((imgTag, index) => {
    if (!imgTag.includes('alt=') || imgTag.includes('alt=""') || imgTag.includes("alt=''")) {
      issues.push(`Image ${index + 1} missing meaningful alt text: ${imgTag.substring(0, 50)}...`);
    }
  });
  
  return issues;
};

/**
 * Validates API error handling
 */
export const validateErrorHandling = (component: string, hasErrorState: boolean, hasFallback: boolean) => {
  const issues: string[] = [];
  
  if (!hasErrorState) {
    issues.push(`Component ${component} lacks error state handling`);
  }
  
  if (!hasFallback) {
    issues.push(`Component ${component} lacks fallback data for API failures`);
  }
  
  return issues;
};

/**
 * Validates that sensitive data is not logged
 */
export const validateSecurityLogging = (codeContent: string) => {
  const issues: string[] = [];
  const sensitivePatterns = [
    /console\.log\([^)]*password/i,
    /console\.log\([^)]*token/i,
    /console\.log\([^)]*secret/i,
    /console\.log\([^)]*key/i,
    /console\.log\([^)]*formData[^)]*\)/i,
  ];
  
  sensitivePatterns.forEach(pattern => {
    if (pattern.test(codeContent)) {
      issues.push(`Potentially sensitive data being logged: ${pattern.source}`);
    }
  });
  
  return issues;
};

/**
 * Validates proper React dependency arrays
 */
export const validateDependencyArrays = (codeContent: string) => {
  const issues: string[] = [];
  
  // Check for useEffect without dependency array
  if (/useEffect\([^}]+\}\);/.test(codeContent)) {
    issues.push('useEffect without dependency array detected - may cause memory leaks');
  }
  
  return issues;
};

export const runAllValidations = (config: {
  translations?: Record<string, any>;
  requiredTranslationKeys?: string[];
  htmlContent?: string;
  codeContent?: string;
  components?: Array<{name: string, hasErrorState: boolean, hasFallback: boolean}>;
}) => {
  const allIssues: {[category: string]: string[]} = {};
  
  if (config.translations && config.requiredTranslationKeys) {
    allIssues.translations = validateTranslations(config.translations, config.requiredTranslationKeys);
  }
  
  if (config.htmlContent) {
    allIssues.accessibility = validateImageAccessibility(config.htmlContent);
  }
  
  if (config.codeContent) {
    allIssues.security = validateSecurityLogging(config.codeContent);
    allIssues.performance = validateDependencyArrays(config.codeContent);
  }
  
  if (config.components) {
    allIssues.errorHandling = config.components.flatMap(comp => 
      validateErrorHandling(comp.name, comp.hasErrorState, comp.hasFallback)
    );
  }
  
  return allIssues;
};