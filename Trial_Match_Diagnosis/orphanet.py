import os
import json
from lxml import etree

def parse_newstyle_orphanet(xml_path):
    """
    Parses an Orphanet XML with structure like:
    <JDBOR>
      <HPODisorderSetStatusList>
        <HPODisorderSetStatus>
          <Disorder>
            <OrphaCode>...</OrphaCode>
            <Name>...</Name>
            <HPODisorderAssociationList>...</HPODisorderAssociationList>
          </Disorder>
        </HPODisorderSetStatus>
        ...
      </HPODisorderSetStatusList>
    </JDBOR>
    
    Returns a dict:
    {
      "ORPHA:58 | Alexander disease": {
        "hpo_terms": [...],
        "frequencies": { "HP:0000256": "Very frequent (99-80%)", ... }
      },
      ...
    }
    """
    tree = etree.parse(xml_path)
    root = tree.getroot()

    disease_dict = {}

    # Grab all <Disorder> elements from any depth
    # e.g. //Disorder means "all Disorder tags at any level"
    disorders = root.xpath("//Disorder")

    for disorder in disorders:
        # 1) OrphaCode
        orpha_code_el = disorder.find("OrphaCode")
        if orpha_code_el is not None:
            orpha_code = orpha_code_el.text
        else:
            continue  # skip if we can't find OrphaCode

        # 2) Disease name
        name_el = disorder.find("Name")
        if name_el is not None:
            disease_name = name_el.text
        else:
            disease_name = f"UnknownOrpha_{orpha_code}"

        disease_key = f"ORPHA:{orpha_code} | {disease_name}"

        # 3) HPO associations
        hpo_terms = []
        freq_map = {}

        assoc_list_el = disorder.find("HPODisorderAssociationList")
        if assoc_list_el is not None:
            associations = assoc_list_el.findall("HPODisorderAssociation")
            for assoc in associations:
                hpo_el = assoc.find("HPO")
                if hpo_el is not None:
                    hpo_id_el = hpo_el.find("HPOId")
                    if hpo_id_el is not None:
                        hpo_id = hpo_id_el.text
                    else:
                        hpo_id = None

                    # frequency
                    freq_el = assoc.find("HPOFrequency")
                    if freq_el is not None:
                        freq_name_el = freq_el.find("Name")
                        if freq_name_el is not None:
                            freq_name = freq_name_el.text
                        else:
                            freq_name = None
                    else:
                        freq_name = None

                    if hpo_id:
                        hpo_terms.append(hpo_id)
                        if freq_name:
                            freq_map[hpo_id] = freq_name

        # remove duplicates
        hpo_terms = list(set(hpo_terms))

        disease_dict[disease_key] = {
            "hpo_terms": hpo_terms,
            "frequencies": freq_map
        }

    return disease_dict


def load_orphanet_data(json_path, xml_path):
    """
    If json_path exists, load from it.
    Otherwise parse the XML, save the result to json_path, then return it.
    """
    if os.path.exists(json_path):
        # load from JSON
        with open(json_path, "r") as f:
            data = json.load(f)
        return data
    else:
        # parse from XML
        data = parse_newstyle_orphanet(xml_path)
        with open(json_path, "w") as f:
            json.dump(data, f, indent=2)
        return data


# Test function call (for a .ipynb cell)
def test_orphanet_parser():
    xml_file = "data/en_product6.xml"        # replace with your file
    json_file = "data/converted_orphanet.json"   # output
    data = load_orphanet_data(json_file, xml_file)
    print(f"Parsed {len(data)} diseases.")
    # Print first 3 entries
    keys = list(data.keys())[:3]
    for k in keys:
        print(k, data[k])

if __name__ == "__main__":
    test_orphanet_parser()
