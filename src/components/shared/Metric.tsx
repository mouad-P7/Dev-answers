import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textClasses?: string;
  href?: string;
  isAuthor?: boolean;
  target?: string;
}

export default function Metric({
  imgUrl,
  alt,
  value,
  title,
  textClasses,
  href,
  isAuthor,
  target,
}: MetricProps) {
  const metricContent = (
    <div className={`flex items-start gap-1`}>
      <Image
        src={imgUrl}
        width={17}
        height={17}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`flex flex-wrap items-center gap-1 ${textClasses}`}>
        <span className="line-clamp-1">{value}</span>
        {isAuthor && (
          <span className="small-regular line-clamp-1"> {title}</span>
        )}
      </p>
    </div>
  );

  return (
    <>
      {href ? (
        <Link href={href} target={target} className="flex-center">
          {metricContent}
        </Link>
      ) : (
        <>{metricContent}</>
      )}
    </>
  );
}
