import * as React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import capitalize from 'lodash/capitalize';

export const Link: React.FC<LinkProps> = ({
  children,
  className,
  to,
  ariaLabel,
  currentTab,
  type = 'route',
  disabled,
  ...props
}) => {
  const formattedAriaLabel = capitalize(ariaLabel);
  const isExternalUrl = !to.startsWith('/');

  let htmlAnchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
    className: className || '',
  };

  if (isExternalUrl || type !== 'route') {
    const target = currentTab || type !== 'route' ? '_self' : '_blank';

    let href: string;

    switch (type) {
      case 'mail':
        href = `mailto:${to}`;
        break;
      case 'phone':
        href = `tel:${to}`;
        break;
      default:
        href = to;
        break;
    }

    if (type !== 'text') {
      htmlAnchorProps = {
        ...htmlAnchorProps,
        target,
        href,
        rel: 'noopener noreferrer',
        'aria-label': formattedAriaLabel,
      };
    }

    if (type === 'text' || disabled) {
      htmlAnchorProps = {
        ...htmlAnchorProps,
        className: `${htmlAnchorProps.className} disabled`,
      };

      return (
        <span {...htmlAnchorProps} {...props}>
          {children}
        </span>
      );
    }

    return (
      <a {...htmlAnchorProps} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink {...htmlAnchorProps} {...props} href={to}>
      {children}
    </NextLink>
  );
};

type LinkProps = React.AnchorHTMLAttributes<Element> &
  Omit<NextLinkProps, 'href'> & {
    children: React.ReactNode;
    to: `/${string}` | `http${string}`;
    className?: string;
    ariaLabel?: string;
    currentTab?: boolean;
    type?: 'route' | 'text' | 'mail' | 'phone';
    disabled?: boolean;
  };
