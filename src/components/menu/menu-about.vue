<template>
  <transition>
    <div
      v-if="showModal"
      class="modal-about">
      <div
        class="header-modal row no-gutters">
        <div>
          <img
            src='@/assets/logo-simar.svg'
            class="logo-simar">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            class="tab-menu-modal">
            <el-tab-pane
              label="Sobre el proyecto"
              name="first">
              <div class="row no-gutters content">
                <div class="col-4 first-column">
                  <h1>SISTEMA DE INFORMACIÓN Y ANÁLISIS DE ECOSISTEMAS MARINOS DE MÉXICO (SIMAR)</h1>
                  <h5><i>Information & Analysis System of Marine Ecosystem of Mexico</i></h5>
                  <div
                    class="row left-bar">
                    <div
                      class="col-md-12">
                      <img
                        style="margin-top: -20px"
                        src='@/assets/modal-images/LOGO---CONABIO.png'
                        class="img img-responsive">
                    </div>
                    <div
                      class="col-md-12">
                      <img
                        style="width: 41%; margin-top: -80px"
                        src='@/assets/modal-images/LOGO---MARES-MEXICANOS.png'
                      >
                    </div>
                  </div>
                </div>
                <div class="col-8 second-column">
                  <p>
                    El sistema de información y análisis de ecosistemas marino de México (SIMAR) es un desarrollo tecnológico de la Comisión Nacional para el Conocimiento
                    y Uso de la Biodiversidad de México (CONABIO). Está diseñado sobre la base de una plataforma web on-line interactiva que integra y visualiza datos in-situ
                    (a través del sistema in-situ de monitoreo oceánico, SIDMO), de diversas instituciones que realizan labor de monitoreo marino-costero, y productos satelitales de temperatura
                    y color del océano (a través del sistema satelital de monitoreo oceánico, SATMO). De ambos módulos se derivan sistemas operacionales de evaluación de ecosistemas y
                    alertas tempranas para la toma de decisiones, como instrumentos para la conservación y uso sostenible de la biodiversidad (ej. en áreas naturales protegidas marinas).
                    Constituye una herramienta de análisis de la biodiversidad marina que permite estudiar los cambios en los ecosistemas marino-costeros mexicanos a corto y largo plazo y la generación de
                    conocimiento para un manejo sustentable, en un contexto de cambio y variabilidad climática.<br><br>

                    Uno de los primeros desarrollos operacionales incluidos en SIMAR es el sistema satelital de alerta temprana de blanqueamiento de corales (SATcoral)
                    el cual genera alertas semanales del estrés térmico en los corales, a partir de imágenes de temperatura nocturna del mar, estimadas por sensores satelitales de NASA y NOAA a 1-km
                    de resolución espacial. El algoritmo de detección este sistema se basa en la metodología propuesta por NOAA Coral Reef Watch para productos con resolución de 5-km.<br><br>

                    Actualmente se encuentran en desarrollo dentro de SIMAR los siguientes módulos operacionales: sistema satelital de alerta temprana de florecimientos algales (SATfa),
                    para estudiar la posible ocurrencia de de florecimientos algales nocivos (mareas rojas) con riesgo a la salud humana; el sistema satelital de alerta temprana de sargazo (SATsum)
                    que permitirá estimar las áreas con presencia de sargazo pelágico en la zona marino-costera de México, considerando además la relación entre su nivel de acumulación y su impacto sobre
                    las playas; y el sistema de alerta del estado de salud de los ecosistemas costeros mexicanos: Mar Caribe (CostaMEX-Caribe).<br><br>

                    SIMAR incluye herramientas interactivas para el análisis de las series de tiempo de los datos recabados mediante la implementación del sistema satelital de boyas virtuales para el monitoreo
                    oceánico (VirtualSAT); así como los registros de monitoreo de biodiversidad obtenidos a través de ciencia ciudadana, en apoyo a gobiernos, academia y sociedad civil,
                    para conocer y utilizar de forma sostenible la biodiversidad de los mares mexicanos.<br><br>

                    Los productos y sistemas operacionales que provee SIMAR traspasan las fronteras de la Zona Económica Exclusiva de México al alcanzar territorios marinos de otros países de la cuenca del Mar
                    Caribe, el Golfo de México y el Pacífico Tropical. Con ellos trabajaremos para apoyar un esfuerzo regional para documentar los cambios que están ocurriendo en la biodiversidad marina a lo
                    largo de las costa de América, a través de la La Red de Observación de la Biodiversidad Marina Polo a Polo de las Américas (P2P-MBON), al integrar conocimiento y análisis.<br><br>

                    Las imágenes en SIMAR se proporcionan en la proyección de mapas: WGS-84/Lat-Lon/ Geográfico/Equirectangular - EPSG: 4326 y abarcan el Golfo de México, el Mar Caribe y parte del Pacífico
                    nor-oriental (Lat. 1.0°, 33.0°; Lon. -123.0°, -59.0°), cubriendo un área de 20,489,601 km2 correspondiente a 6401 x 3201 píxeles, de 1-km de resolución espacial.<br><br>

                    Como parte de la política de uso de datos de la Conabio toda la información y los análisis presentados dentro de SIMAR son libres y de uso público sin restricciones.
                    Se trabaja para que próximamente todos los datos que se presentan en SIMAR puedan ser descargados por cualquier usuario.<br><br>

                    Los productos de SIMAR son útiles para divulgación, docencia, investigaciones científica, ciencias aplicadas y el monitoreo de ecosistemas
                    mediante sistemas operacionales para la toma de decisiones.<br><br>

                    SIMAR es accesible tanto desde [<a
                      href="https://simar.conabio.gob.mx"
                      target="_blank">https://simar.conabio.gob.mx</a>], como desde el sitio web Mares Mexicanos-Conabio [<a
                        href="http://www.biodiversidad.gob.mx/mares"
                        target="_blank">http://www.biodiversidad.gob.mx/mares</a>].<br><br>

                    Para dudas, sugerencias o comentarios, puede contactarnos a través del email: <a href="mailto:simar@conabio.gob.mx">simar@conabio.gob.mx</a>

                  </p>
                  <p class="quotation">
                    Forma de citar:
                    Cerdeira-Estrada, S., R. Martell-Dubois, R. Ressl, J. Valdéz. 2018. Sistema de información y análisis de ecosistemas marino de México -
                    Information & Analysis System of Marine Ecosystem of Mexico (SIMAR). CONABIO, México. Dataset accessed [2018-06-1] at simar.conabio.gob.mx.
                  </p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="Responsables"
              name="fifth">
              <div class="credits">
                <div class="credits-data">
                  <h1>Responsables | Desarrolladores:</h1>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">Dr. <b>Sergio Cerdeira Estrada</b></span><br>
                      Subcoordinador de Monitoreo Marino, Líder de SIMAR<br>
                      Subcoordinación de Monitoreo Marino, CONABIO, México<br>
                      <a href="mailto:scerdeira@conabio.gob.mx">scerdeira@conabio.gob.mx</a>  |  <a
                        href="https://www.researchgate.net/profile/Sergio_Cerdeira-Estrada"
                        target="_blank">Researchgate</a>
                    </div>
                    <div class="data">
                      <span class="title-colab">Dr. <b>Rainer Ressl</b></span><br>
                      Director General de Geomática, CONABIO, México<br>
                      <a href="mailto:rressl@conabio.gob.mx">rressl@conabio.gob.mx</a>  |  <a
                        href="https://www.researchgate.net/profile/Rainer_Ressl"
                        target="_blank">Researchgate</a>
                    </div>
                  </div>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">Dr. <b>Raúl Martell Dubois</b></span><br>
                      Especialista en Monitoreo Marino<br>
                      Subcoordinación de Monitoreo Marino, CONABIO, México<br>
                      <a href="mailto:rmartell@conabio.gob.mx">rmartell@conabio.gob.mx</a>  |   <a href="https://www.researchgate.net/profile/Raul_Martell_Dubois">Researchgate</a>
                    </div>
                    <div class="data">
                      <span class="title-colab">Ing. <b>Jaime E. Valdéz</b></span><br>
                      Programador - SIMAR<br>
                      Subcoordinación de Monitoreo Marino, CONABIO, México<br>
                      <a href="mailto:jvaldezch@gmail.com">jvaldezch@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="Colaboradores"
              name="fourth">
              <div class="credits">
                <div class="credits-data">
                  <h1>Colaboradores:</h1>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">Dra. <b>Susana Perera Valderrama</b></span><br>
                      Especialista en Monitoreo Marino<br>
                      Subcoordinación de Monitoreo Marino, CONABIO, México<br>
                      <a href="mailto:sperera@conabio.gob.mx">sperera@conabio.gob.mx</a>  |  Tel. (55) 5004.4987
                    </div>
                    <div class="data">
                      <span class="title-colab">Dr. <b>Jorge Zavala-Hidalgo</b></span><br>
                      Centro de Ciencias de la Atmósfera, UNAM, México<br>
                      <a href="https://www.researchgate.net/profile/Jorge_Zavala-Hidalgo">Researchgate</a>
                    </div>
                  </div>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">M.C. <b>Laura Olivia Rosique de la Cruz</b></span><br>
                      Especialista en Monitoreo Marino<br>
                      Subcoordinación de Monitoreo Marino, CONABIO, México<br>
                      <a
                        href="mailto:lrosique@conabio.gob.mx"
                        target="_blank">lrosique@conabio.gob.mx</a>  |  Tel. (55) 5004.4987
                    </div>
                    <div class="data">
                      <span class="title-colab">Dr. <b>Ismael Mariño-Tapia</b></span><br>
                      Departamento de Recursos del Mar<br>
                      IPN, CINVESTAV, Mérida, México<br>
                      <a
                        href="https://www.researchgate.net/profile/Ismael_Marino-Tapia"
                        target="_blank">Researchgate</a>
                    </div>
                  </div>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">Dr. <b>Eduardo Santamaría del Ángel</b></span><br>
                      Facultad de Ciencias Marinas<br>
                      Universidad Autónoma de Baja California, Ensenada, México<br>
                      <a
                        href="https://www.researchgate.net/profile/Eduardo_Santamaria-Del-Angel"
                        target="_blank">Researchgate</a>
                    </div>
                    <div class="data">
                      <span class="title-colab">Dr. <b>Héctor Reyes Bonilla</b></span><br>
                      Departamento de Biología Marina<br>
                      Universidad Autónoma de Baja California Sur, UABCS, La Paz, México<br>
                      <a
                        href="https://www.researchgate.net/profile/Hector_Reyes-Bonilla"
                        target="_blank">Researchgate</a>
                    </div>
                  </div>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">Dr. <b>Frank E. Muller-Karger</b></span><br>
                      Institute for Marine Remote Sensing<br>
                      College of Marine Science, University of South Florida, U.S.A.<br>
                      <a
                        href="https://www.researchgate.net/profile/Frank_Muller-Karger"
                        target="_blank">Researchgate</a>
                    </div>
                    <div class="data">
                      <span class="title-colab">Dr. <b>Lorenzo Álvarez Filip</b></span><br>
                      Unidad Académica de Sistemas Arrecifales, UASA<br>
                      Instituto de Ciencias del Mar y Limnología, ICMYL<br>
                      UNAM, Puerto Morelos, México<br>
                      <a
                        href="https://www.researchgate.net/profile/Lorenzo_Alvarez-Filip"
                        target="_blank">Researchgate</a>
                    </div>
                  </div>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">Dr. <b>Chuanmin Hu</b></span><br>
                      Optical Oceanography Laboratory<br>
                      College of Marine Science, University of South Florida, U.S.A.<br>
                      <a
                        href="https://www.researchgate.net/profile/Chuanmin_Hu"
                        target="_blank">Researchgate</a>
                    </div>
                    <div class="data">
                      <span class="title-colab">Dr. <b>Joaquín Rodrigo Garza-Pérez</b></span><br>
                      Facultad de Ciencias, UNAM, Sisal, Yucatán, México<br>
                      <a
                        href="https://www.researchgate.net/profile/Joaquin_Garza-Perez"
                        target="_blank">Researchgate</a>
                    </div>
                  </div>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">Dr. <b>Rodolfo Silva-Casarín</b></span><br>
                      Instituto de Ingeniería, UNAM, México<br>
                      Facultad de Ingeniería, UNAM, México<br>
                      CeMIE-Océano
                      <a
                        href="https://www.researchgate.net/profile/Rodolfo_Silva7"
                        target="_blank">Researchgate</a>
                    </div>
                    <div class="data">
                      <span class="title-colab">Dr. <b>Milton Kampel</b></span><br>
                      Laboratório Multiusuário de Monitoramento Oceânico por Satélite - MOceanS<br>
                      Instituto Nacional de Pesquisas Espacias, INPE, Sao Paulo, Brasil<br>
                      <a
                        href="https://www.researchgate.net/profile/Milton_Kampel"
                        target="_blank">Researchgate</a>
                    </div>
                  </div>
                  <div
                    class="row no-gutters div"
                    style="justify-content: space-between">
                    <div class="data">
                      <span class="title-colab">Dr. <b>Edgar Gerardo Mendoza Baldwin</b></span><br>
                      Instituto de Ingeniería, UNAM, México<br>
                      CeMIE-Océano<br>
                      <a
                        href="https://scholar.google.com/citations?user=Z4ZTek0AAAAJ&hl=es"
                        target="_blank">GoogleScholar</a>
                    </div>
                    <div class="data">
                      <span class="title-colab">Dra. <b>Ana Inés Dogliotti</b></span><br>
                      Instituto de Astronomía y Física del Espacio, IAFE<br>
                      Consejo Nacional de Investigaciones Científicas y Técnicas, CONICET, Argentina<br>
                      <a
                        href="https://www.researchgate.net/profile/Ana_Dogliotti"
                        target="_blank">Researchgate</a>
                    </div>
                  </div>

                </div>
                <div
                  class="colabs-logos"
                >
                  <div class="colabs-logos-inner">
                    <img
                      src="@/assets/modal-images/colabs/logo-conanp-grises.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/logoINECC.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/UNAM.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/cinvestav-merida-yucatan.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/SEMAR_logo_2012.svg.png"
                      alt="">
                  </div>
                  <div class="colabs-logos-inner">
                    <img
                      src="@/assets/modal-images/colabs/geobon.jpg"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/mbon.jpg"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/amerigeoss_800.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/pogo1.png"
                      alt="">
                  </div>
                  <div class="colabs-logos-inner">
                    <img
                      src="@/assets/modal-images/colabs/Antares.jpeg"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/1200px-NOAA_logo.svg.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/1200px-NASA_logo.svg.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/Logo_OBIS.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/cemie-oceano.jpg"
                      alt="">
                  </div>
                  <div class="colabs-logos-inner">
                    <img
                      src="@/assets/modal-images/colabs/LogoCEA_Akumal.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/Healthy_Reefs.jpg"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/logo_cobi_2017.ai-9.png"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/marti-logo.jpg"
                      alt="">
                    <img
                      src="@/assets/modal-images/colabs/LOGO-ASK-esp.jpg"
                      alt="">
                  </div>

                </div>
              </div>

            </el-tab-pane>
            <el-tab-pane
              label="Patrocinadores"
              name="second">
              <div class="content partners">
                <div class="logos">

                  <div
                    class="col-md-12 first-sponsor">
                    <img
                      class="conabio"
                      src='static/images/logo-conabio-red-title.svg'>
                    <p class="sponsor-desc"><b>Nacional Financiera Fideicomiso Fondo para la Biodiversidad</b> - CONABIO. México. 2009-2019</p>
                  </div>

                  <div
                    class="col-md-12">
                    <img src='@/assets/logo-semarnat.png'>
                    <p class="sponsor-desc"><b>Secretaría de Medio Ambiente y Recursos Naturales</b> (SEMARNAT). México. 2015-2019</p>
                  </div>

                  <div
                    class="col-md-12">
                    <img src='@/assets/logo-semarnat.png'>
                    <img
                      class="conabio"
                      src='static/images/logo-conabio-red-title.svg'>
                    <img src='@/assets/modal-images/colabs/logo-conanp-grises.png'>
                    <img src='@/assets/modal-images/patrocinadores/Short-GEF-logo-colored-NOTAG-transparent.png'>
                    <img src='@/assets/modal-images/patrocinadores/PNUD_Logo-azul-tagline-negro.png'>
                    <img src='@/assets/modal-images/patrocinadores/Resiliencia.png'>

                    <p class="sponsor-desc"><b>Proyecto GEF-5 Resiliencia</b>. CONANP-PNUD-CONABIO: Fortalecimiento de la efectividad del manejo y la resiliencia
                    de las áreas naturales protegidas para proteger la biodiversidad amenazada por el cambio climático. México. 2016-2019</p>
                  </div>

                  <div
                    class="col-md-12">
                    <img src='@/assets/modal-images/LOGO-IAI.png'>
                    <img src='@/assets/modal-images/LOGO-ANTARES.jpg'>
                    <p class="sponsor-desc"><b>IAI-Antares</b>: Assessment of Marine Ecosystem Services at the Latin-american Antares Time-series Network. 2015-2017</p>
                  </div>

                  <div
                    class="col-md-12">
                    <img src='@/assets/logo-semarnat.png'>
                    <img
                      class="conabio"
                      src='static/images/logo-conabio-red-title.svg'>
                    <img src='@/assets/modal-images/patrocinadores/Short-GEF-logo-colored-NOTAG-transparent.png'>
                    <img src='@/assets/modal-images/patrocinadores/onu-pnuma_trans.gif'>
                    <img src='@/assets/modal-images/patrocinadores/NOAA.png'>

                    <p class="sponsor-desc"><b>Proyecto GEF-6 Gran Ecosistema Marino del Golfo de México GoMx-LME</b>. CONABIO - SEMARNAT - PNUMA - NOAA.
                    Implementation of the Strategic Action Program of the Gulf of Mexico Large Marine Ecosystem. 2018-2022
                    </p>
                  </div>

                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <i
          @click="closeModal"
          class="icon-x"/>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'MenuAbout',
  data () {
    return {
      activeName: 'first',
      ModalVisible: true
    }
  },
  methods: {
    handleClick (tab, event) {
    },
    closeModal () {
      this.$emit('closeModal')
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-about {
    width: 860px;
    height: 608px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 401;
    background: $color-ui-primary-dark-alpha;
    border: 1px solid $color-ui-primary-dark;
    .header-modal {
      background: $color-ui-primary-dark;
      height: 50px;
      align-items: center;
      display: flex;
      justify-content: space-between;
      .logo-simar {
        height: 20px;
        margin-left: 20px;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0 20px 0 0;
        height: 50px;
        li {
          display: inline;
          line-height: 50px;
          margin-left: 20px;
          i {
            margin-top: 20px;
          }
          &:hover {
            color: #23A1C8;
            cursor: pointer;
            border-bottom: 2px solid #23A1C8;
            padding-bottom: 15px;
          }
        }
      }
    }
    .left-bar{
      height: 160px;
      div{
        height: 160px;
        display: flex;
        align-items: center;
        img{
          display: block;
          margin: 0 auto;
          width: 60%;
        }
      }
    }
    .quotation{
      border-top: solid 1px #5D5D5D;
      border-bottom: solid 1px #5D5D5D;
      margin-top: 20px;
      padding: 20px 0px;
      font-size: 12px;
    }
  }

  .modal-about{
    .first-column {
      padding: 20px;
      h1 {
        @include font-primary(25px, light);
        color: #CCCCCC;
        line-height: 34px;
      }
      p {
        @include font-primary(18px, regular);
        color: #CCCCCC;
        line-height: 24px;
      }
    }
  }

  .second-column {
    overflow-y: scroll;
    padding: 20px 20px 20px 0;
    height: 558px;
    p {
      @include font-primary(14px, light);
      color: #CCCCCC;
      margin: 0;
    }
  }

  .logo-simar{
    width: 161.83px;
    height: 20px;
    position: absolute;
    top: 15px;
  }

  .partners {
    background: white;
    height: 557px;
    width: 859px;
    border: 1px solid #CCCCCC;
    overflow: auto;
  }

  .colabo {
    height: 557px;
    width: 855px;
  }

  .logos {
    padding: 50px;
    text-align: center;
    height: 100%;
    padding-top: 25px;
    .first-sponsor{
      border-top: solid 1px #ccc;
    }
    .col-md-12{
      padding-top: 10px;
      border-bottom: solid 1px #ccc;
      color: #292929;
      text-align: left;
      .sponsor-desc{
        margin-top: 10px;
      }
    }
    img{
      max-height: 50px;
      &.conabio{
        max-width: 80px;
      }
    }
    .first-logo {
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .logo-conabio {
      width: 130px;
      height: 90px;
    }
    .logo-semarnat {
      width: 230px;
      height: 78px;
    }
    .logo-gef {
      width: 111.22px;
      height: 130px;
    }
    .logo-pnud {
      width: 63.56px;
      height: 150px;
    }
    .logo-conanp {
      width: 118.58px;
      height: 120px;
    }
    .logo-resiliencia {
      width:221.53px;
      height: 100px;
    }
    .logo-mares {
      width: 120.81px;
      height:120.81px;
    }
  }

  .icon-x{
    position: absolute;
    left: 827px;
    top: 17px;
    font-size: 15.5px;
    &:hover{
      cursor: pointer;
      color: white;
    }
  }
  .credits{
    overflow-y: scroll;
    height: 557px;
    width: 855px;
    padding: 15px 60px;
    .credits-data{
      h1{
        @include font-primary(28px, light);
        color: #CCCCCC;
        margin-bottom: 30px;
      }
    }
    .data{
      padding: 15px 15px 0px 0px;
      width: 50%;
      margin-bottom: 20px;
      h2{
        @include font-primary(14px, regular);
        color: white;
      }
      h3{
        @include font-primary(12px, regular);
        color: #CCCCCC;
      }
    }
    .title-colab{
    font-size: 13.5px}
  }
  .colabs-logos{
    background: white;
    width: 100%;
    margin-bottom: 30px;
    .colabs-logos-inner{
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #000000;
      &:first-child{
        border-top: 1px solid #000000;
      }
      img{
        max-height: 70px;
        margin: 0 10px;
      }
      &:nth-child(1){
        img:nth-child(1), img:nth-child(2){
          max-height: 50px;
        }
      }
    }
  }

</style>
