import { useFela, } from 'react-fela'
import * as React from 'react';

export default function Hero() {
  const { css, theme, } = useFela();

  const headerClasses = css({
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative',
    textAlign: 'center',
  })
  const ImgWrapperClasses = css({
    height: '0',
    paddingBottom: '140%',
    position: 'relative',
  })

  const imgAnim = {
    '0%': { opacity: '0', },
    '10%': { opacity: '0', },
    '10.1%': { opacity: '1', },
    '10.5%': { opacity: '1', },
    '10.6%': { opacity: '0', },
    '15%': { opacity: '0', },
    '15.1%': { opacity: '1', },
    '16%': { opacity: '1', },
    '16.1%': { opacity: '0', },
    '30%': { opacity: '0', },
    '30.1%': { opacity: '1', },
    '30.5%': { opacity: '1', },
    '30.6%': { opacity: '0', },
    '31%': { opacity: '0', },
    '31.1%': { opacity: '1', },
    '32%': { opacity: '1', },
    '32.1%': { opacity: '0', },
    '33%': { opacity: '0', },
    '33.1%': { opacity: '1', },
    '33.6%': { opacity: '1', },
    '33.7%': { opacity: '0', },
    '34.5%': { opacity: '0', },
    '34.6%': { opacity: '1', },
    '42%': { opacity: '1', },
    '42.1%': { opacity: '0', },
    '42.2%': { opacity: '0', },
    '42.4%': { opacity: '1', },
    '50%': { opacity: '1', },
    '50.1%': { opacity: '0', },
    '50.2%': { opacity: '0', },
    '50.4%': { opacity: '1', },
    '50.5%': { opacity: '1', },
    '50.6%': { opacity: '0', },
    '100%': { opacity: '0', },
  }

  const ImgClasses = css({
    bottom: '0',
    height: '100%',
    left: '0',
    mixBlendMode: 'darken',
    position: 'absolute',
    right: '0',
    top: '0',
    width: '100%',
  });
  const Img2Classes = css({
    animationDuration: '20s',
    animationIterationCount: 'infinite',
    animationName: imgAnim,
    bottom: '8.1%',
    opacity: '0',
    position: 'absolute',
    right: '11.85%',
    transform: 'translate(0,0) skew(0) scale(1)',
    width: '43.25%',
  });

  const titleClasses = css({
    color: theme.color('green', '+1'),
    left: '50%',
    margin: '0 auto 0',
    maxWidth: '80rem',
    mixBlendMode: "multiply",
    top: '8rem',
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: '100%',

    extend: [
      theme.type(5, { untilBp: 's', }),
      theme.type(9, { fromBp: 's', untilBp: 'l', }),
      theme.type(11, { fromBp: 'l', untilBp: 'xl', }),
      theme.type(11, { fromBp: 'xl', }),
      theme.mq({ from: 's', until: 'm', }, { top: '10rem', }),
      theme.mq({ from: 'm', until: 'xl', }, { top: '14rem', }),
      theme.mq({ from: 'l', until: 'xl', }, { top: '18rem', }),
      theme.mq({ from: 'xl', }, {
        top: '12rem',
        maxWidth: '90rem',
      }),
    ],
  });

  const titleSmallClasses = css({
    color: theme.color('red', '+1'),
    display: 'block',
    opacity: '.9',

    extend: [
      theme.type(3, { untilBp: 's', }),
      theme.type(6, { fromBp: 's',  lines: 8, }),
    ]
  });

  const subheadClasses = css({
    color: theme.color('bodyText'),
    display: 'block',
    fontWeight: '700',
    margin: '4rem auto 0',
    maxWidth: '130',
    padding: '0 2rem',
    position: 'relative',
    marginTop: '-5rem',

    extend: [
      theme.type(2, { untilBp: 's', }),
      theme.type(3, { fromBp: 's', lines: 6, }),
      theme.mq({ from: 's', until: 'm', }, { marginTop: '-10rem', }),
      theme.mq({ from: 'm', until: 'xl', }, { marginTop: '-12rem', }),
      theme.mq({ from: 'xl', }, { marginTop: '-10rem', }),
    ],
  });

  const footerClasses = css({
    marginTop: '1rem',
  });


  const addressClasses = css({
    color: theme.color('red'),
    fontWeight: '700',
  });

  return (
    <header className={headerClasses}>
      <div className={ImgWrapperClasses}>
        <img
          className={ImgClasses}
          src="https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_320/v1569766334/1.7912412.961090896.jpg"
          srcSet={[
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_320/v1569766334/1.7912412.69811424.jpg 320w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_375/v1569766334/1.7912412.69811424.jpg 375w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_414/v1569766334/1.7912412.69811424.jpg 414w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_600/v1569766334/1.7912412.69811424.jpg 600w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_768/v1569766334/1.7912412.69811424.jpg 768w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_1000/v1569766334/1.7912412.69811424.jpg 1000w',
          ].join(',')}
          sizes="(min-width: 1000px) 1000px, 100vw"
          role="presentation"
          alt="איור של דוכיפתת מיינה ודרורים"
        />
        <img
          className={Img2Classes}
          src="https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_320/v1569766746/1.7919327.4101634296.jpg"
          srcSet={[
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_180/v1569766746/1.7919327.4101634296.jpg 180w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_270/v1569766746/1.7919327.4101634296.jpg 270w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_360/v1569766746/1.7919327.4101634296.jpg 360w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_434/v1569766746/1.7919327.4101634296.jpg 434w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_540/v1569766746/1.7919327.4101634296.jpg 540w',
            'https://images.haarets.co.il/image/upload/c_fill,f_auto,q_auto,w_680/v1569766746/1.7919327.4101634296.jpg 680w',
          ].join(',')}
          sizes="(min-width: 1000px) 435.5px, 43.35vw"
          role="presentation"
          alt="איור של דוכיפתת מיינה ודרורים"
        />
      </div>
        <h1 className={titleClasses}>
          להתראות דוכיפת, <br />
          שלום מיינה:
          <span className={titleSmallClasses}>
            האם הציפורים
            הארץ־ישראליות <br />
            עומדות להיעלם מהנוף?
          </span>
      </h1>
      <p className={subheadClasses}>
        הנחליאלי, החוגלה, העפרוני והפשוש — ישראל חווה אובדן אדיר של מינים, והציפורים שהיו חלק בלתי נפרד מהטבע סביבנו הולכות ונעלמות. האם עוד אפשר להפוך את המגמה או שנגזר עלינו להסתפק בדררות, עורבים וצוצלות?
      </p>

      <footer className={footerClasses}>
        <address className={addressClasses}>
          <a href="/misc/writers/WRITER-1.1702083">נטע אחיטוב</a>
        </address>
      </footer>
    </header>
  )
}
