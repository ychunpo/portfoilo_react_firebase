
#1D2031

#1e2b37

#1CE6C6

#03a1d9

w = {{ base: '280px', lg: '360px', md: '320px', sm: '300px', xs: '290px' }}

box - shadow:
rgba(0, 0, 0, 0.17) 0px - 23px 25px 0px inset,
  rgba(0, 0, 0, 0.15) 0px - 36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px - 79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px,
        rgba(0, 0, 0, 0.09) 0px 4px 2px,
          rgba(0, 0, 0, 0.09) 0px 8px 4px,
            rgba(0, 0, 0, 0.09) 0px 16px 8px,
              rgba(0, 0, 0, 0.09) 0px 32px 16px;


const [divElem, setDivElem] = useState();
//console.log('divElem', divElem)
const [imageTextWidth, setImageTextWidth] = useState('0px');

const getImgWidth = () => {
  let element = document.querySelector('div > #modelImageItem');
  setDivElem(element);
}

const resizeImgTxtWidth = new ResizeObserver((entries) => {
  for (let entry of entries) {
    console.log('entry', entry.contentBoxSize.inlineSize)
    //setImageTextWidth(entry.contentBoxSize.inlineSize);
  }
});

useEffect(() => {
  getImgWidth();
  window.addEventListener('load', resizeImgTxtWidth.observe(divElem))
  //resizeImgTxtWidth.observe(divElem);
  // return () => {
  //   changeImgTxtWidth.unobserve(element);
  // }
}, []);

testing deploy 5;


